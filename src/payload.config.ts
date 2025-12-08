import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Journeys } from './collections/Journeys'
import { Lessons } from './collections/Lessons'
import { Chapters } from './collections/Chapters'
import { Quests } from './collections/Quests'
import { Habits } from './collections/Habits'
import { Quizzes } from './collections/Quizzes'
import { Universes } from './collections/Universes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  async onInit(payload) {
    // Seed super_admin from env vars if no admins exist
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      payload.logger.warn('ADMIN_EMAIL and ADMIN_PASSWORD env vars not set - skipping admin seeding')
      return
    }

    const existingAdmins = await payload.find({
      collection: 'admins',
      limit: 1,
    })

    if (existingAdmins.totalDocs === 0) {
      await payload.create({
        collection: 'admins',
        data: {
          email: adminEmail,
          password: adminPassword,
          role: 'super_admin',
        },
      })
      payload.logger.info(`Created initial super_admin: ${adminEmail}`)
    }
  },
  localization: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
  blocks: [Chapters, Quests, Habits, Quizzes],
  collections: [Admins, Media, Universes, Journeys, Lessons],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    schemaName: 'content',
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // S3 storage - only enabled when S3_BUCKET is configured
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: 'media',
              },
            },
            bucket: process.env.S3_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              region: process.env.S3_REGION || '',
              ...(process.env.S3_ENDPOINT && { endpoint: process.env.S3_ENDPOINT }),
            },
          }),
        ]
      : []),
  ],
})
