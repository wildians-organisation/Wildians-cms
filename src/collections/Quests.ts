import type { Block } from 'payload'

export const Quests: Block = {
  slug: 'quests',
  dbName: 'quests',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'task',
      label: 'Le call to action',
      type: 'text',
      required: true,
    },
  ],
}
