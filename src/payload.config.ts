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
    // Ensure ADMIN_EMAIL always exists as super_admin
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail) {
      payload.logger.warn('ADMIN_EMAIL env var not set - skipping admin check')
      return
    }

    // Find admin by exact email match
    const result = await payload.find({
      collection: 'admins',
      where: { email: { equals: adminEmail } },
      limit: 1,
    })

    // Double-check email matches (defense in depth)
    const existingAdmin = result.docs.find((doc) => doc.email === adminEmail)

    if (!existingAdmin) {
      // Admin with this email doesn't exist - create it
      if (!adminPassword) {
        payload.logger.error(`ADMIN_PASSWORD required to create admin: ${adminEmail}`)
        return
      }
      await payload.create({
        collection: 'admins',
        data: {
          email: adminEmail,
          password: adminPassword,
          role: 'super_admin',
          name: 'Maxime Colomès',
        },
      })
      payload.logger.info(`Created super_admin: ${adminEmail}`)
    } else if (existingAdmin.role !== 'super_admin') {
      // Admin exists but is not super_admin - update role
      await payload.update({
        collection: 'admins',
        id: existingAdmin.id,
        data: { role: 'super_admin' },
      })
      payload.logger.info(`Updated ${adminEmail} role to super_admin`)
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
