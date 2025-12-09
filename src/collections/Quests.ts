import type { Block } from 'payload'

export const Quests: Block = {
  slug: 'quests',
  dbName: 'quests',
  labels: {
    singular: 'Quête',
    plural: 'Quêtes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'task',
      label: 'Le call to action',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
