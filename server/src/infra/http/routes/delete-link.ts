import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const DeleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete('/links/:id', {
    schema: {
      summary: 'Delete a short link',
      params: z.object({
        id: z.string(),
      }),
      response: {
        204: z.void(),
        404: z.object({ message: z.string() }).describe('Short link not found.'),
      },
    },
  },
  async (request, reply) => {
    const { id } = request.params

    const [link] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, id))
      .limit(1)

    if (!link) {
      return reply.status(404).send({ message: 'Link não encontrado.' })
    }

    await db.delete(schema.links).where(eq(schema.links.id, id))

    return reply.status(204).send()
  })
}
