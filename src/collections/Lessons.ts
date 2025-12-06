import type { CollectionConfig } from 'payload'
import { Chapters } from './Chapters'
import { Quests } from './Quests'
import { Habits } from './Habits'
import { Quizzes } from './Quizzes'

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
      label: 'Parcours associé',
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
      name: 'contents',
      type: 'blocks',
      minRows: 1,
      maxRows: 20,
      blocks: [
        Chapters,
        Quests,
        Habits,
        Quizzes,
      ],
    },
    // {
    //   name: 'Contenus',
    //   type: 'join',
    //   collection: [Chapters.slug, Quests.slug],
    //   on: 'lesson',
    //   // orderable: true,
    //   admin: {
    //     allowCreate: true,
    //     defaultColumns: ['title', 'content'],
    //   },
    // },
  ],
}
