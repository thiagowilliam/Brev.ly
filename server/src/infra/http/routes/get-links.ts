import { desc } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const GetLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get('/links', {
    schema: {
      summary: 'Get all short links',
      response: {
        200: z.object({
          links: z.array(
            z.object({
              id: z.string(),
              originalUrl: z.string(),
              shortCode: z.string(),
              accessCount: z.number(),
              createdAt: z.string(),
            })
          ),
        }),
      },
    },
  },
  async (_request, reply) => {
    const links = await db.select().from(schema.links).orderBy(desc(schema.links.createdAt))

    return reply.status(200).send({
      links: links.map(link => ({
        ...link,
        createdAt: link.createdAt.toISOString(),
      })),
    })
  })
}
