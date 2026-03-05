import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

const linksStore = new Map<string, string>()

export const CreateShortLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post('/short', {
    schema: {
      summary: 'Create a short link',
      body: z.object({
        originalLink: z.url(),
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

    if (linksStore.has(shortLink)) {
      return reply.status(409).send({ message: 'Este link encurtado já está em uso.' })
    }

    linksStore.set(shortLink, originalLink)

    return reply.status(201).send({ shortLink: `brev.ly/${shortLink}` })
  })
}