import type { CollectionConfig } from 'payload'
import { Chapters } from './Chapters'
import { Quests } from './Quests'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'name',
    description: 'En fait ca s\'appelle Lessons mais ca représente les capsules 🫢',
    listSearchableFields: ['name'],
  },
  fields: [
    {
      name: 'journey',
      type: 'relationship',
      relationTo: 'journeys',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'Contenus',
      type: 'join',
      collection: [Chapters.slug, Quests.slug],
      on: 'lesson',
      // orderable: true,
      admin: {
        allowCreate: true,
        defaultColumns: ['title', 'content'],
      },
    },
  ],
}
