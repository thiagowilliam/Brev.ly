import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export const CreateShortLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post('/short', {
    schema: {
      summary: 'Create a short link',
      body: z.object({
        originalLink: z
          .string()
          .transform(val => (val.match(/^https?:\/\//) ? val : `https://${val}`))
          .pipe(z.url()),
        shortLink: z
          .string()
          .min(3)
          .regex(/^[a-zA-Z0-9-_]+$/),
      }),
      response: {
        201: z.object({ shortLink: z.string() }),
        409: z.object({ message: z.string() }).describe('Short link already exists.'),
      },
    },
  },
  async (request, reply) => {
    const { originalLink, shortLink } = request.body

    const [existing] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortCode, shortLink))
      .limit(1)

    if (existing) {
      return reply.status(409).send({ message: 'Este link encurtado já está em uso.' })
    }

    await db.insert(schema.links).values({
      originalUrl: originalLink,
      shortCode: shortLink,
    })

    return reply.status(201).send({ shortLink: `brev.ly/${shortLink}` })
  })
}