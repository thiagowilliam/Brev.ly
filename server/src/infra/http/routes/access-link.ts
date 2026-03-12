import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq, sql } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const AccessLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get('/:shortCode', {
    schema: {
      summary: 'Redirect to original link and increment access count',
      params: z.object({
        shortCode: z.string(),
      }),
      response: {
        200: z.object({ originalUrl: z.string() }),
        404: z.object({ message: z.string() }).describe('Short link not found.'),
      },
    },
  },
  async (request, reply) => {
    const { shortCode } = request.params

    const [link] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortCode, shortCode))
      .limit(1)

    if (!link) {
      return reply.status(404).send({ message: 'Link não encontrado.' })
    }

    await db
      .update(schema.links)
      .set({ accessCount: sql`${schema.links.accessCount} + 1` })
      .where(eq(schema.links.shortCode, shortCode))

    return reply.status(200).send({ originalUrl: link.originalUrl })
  })
}
