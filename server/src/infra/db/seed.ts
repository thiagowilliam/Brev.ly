import { db } from './index'
import { schema } from './schemas'

async function seed() {
  await db.delete(schema.links)

  await db.insert(schema.links).values([
    { originalUrl: 'https://www.google.com', shortCode: 'google' },
    { originalUrl: 'https://www.github.com', shortCode: 'github' },
    { originalUrl: 'https://www.youtube.com', shortCode: 'youtube' },
    { originalUrl: 'https://www.twitter.com', shortCode: 'twitter' },
    { originalUrl: 'https://www.linkedin.com', shortCode: 'linkedin' },
    { originalUrl: 'https://www.reddit.com', shortCode: 'reddit' },
    { originalUrl: 'https://www.netflix.com', shortCode: 'netflix' },
    { originalUrl: 'https://www.amazon.com.br', shortCode: 'amazon' },
    { originalUrl: 'https://www.notion.so', shortCode: 'notion' },
    { originalUrl: 'https://www.figma.com', shortCode: 'figma' },
  ])

  console.log('Seed concluído com 10 links.')
  process.exit(0)
}

seed()
