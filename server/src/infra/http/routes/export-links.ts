import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { env } from '@/env'
import { r2 } from '@/infra/storage/client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { sql } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

export const ExportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.post('/links/export', {
    schema: {
      summary: 'Export all links to a CSV file on Cloudflare R2',
      response: {
        201: z.object({ url: z.string() }),
      },
    },
  },
  async (request, reply) => {
    const links = await db
      .select({
        originalUrl: schema.links.originalUrl,
        shortCode: schema.links.shortCode,
        accessCount: schema.links.accessCount,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .orderBy(sql`${schema.links.createdAt} desc`)

    const header = 'URL Original,URL Encurtada,Contagem de Acessos,Data de Criação\n'
    const rows = links.map(link =>
      [
        link.originalUrl,
        `brev.ly/${link.shortCode}`,
        link.accessCount,
        link.createdAt.toISOString(),
      ].join(',')
    )
    const csv = header + rows.join('\n')

    const fileName = `${randomUUID()}.csv`

    await r2.send(
      new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET,
        Key: fileName,
        Body: csv,
        ContentType: 'text/csv',
      })
    )

    const url = `${env.CLOUDFLARE_PUBLIC_URL}/${fileName}`

    return reply.status(201).send({ url })
  })
}
