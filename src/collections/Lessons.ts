import type { Block } from 'payload'
import { Chapters } from './Chapters'
import { Quests } from './Quests'
import { Habits } from './Habits'
import { Quizzes } from './Quizzes'

export const Lessons: Block = {
  slug: 'lessons',
  dbName: 'lessons',
  fields: [
    {
      name: 'name',
      label: 'Nom de la capsule',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      localized: true,
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
      blocks: [Chapters, Quests, Habits, Quizzes],
    },
  ],
}
