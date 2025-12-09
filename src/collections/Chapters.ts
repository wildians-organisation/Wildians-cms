import markdownField from '@/fields/MarkdownField'
import type { Block } from 'payload'

export const Chapters: Block = {
  slug: 'chapters',
  labels: {
    singular: 'Parchemin',
    plural: 'Parchemins',
  },
  dbName: 'chapters',
  fields: [
    {
      name: 'title',
      label: 'Titre du parchemin',
      type: 'text',
      required: true,
      localized: true,
    },
    markdownField({
      name: 'content',
      label: 'Contenu en markdown',
      required: true,
      localized: true,
    }),
  ],
}
