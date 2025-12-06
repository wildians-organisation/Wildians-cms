import type { Block } from 'payload'

export const Chapters: Block = {
  slug: 'chapters',
  dbName: 'chapters',
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
  ],
}
