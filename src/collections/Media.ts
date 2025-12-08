import type { CollectionConfig } from 'payload'
import { isContentAdmin, isContentReviewer } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: isContentReviewer,
    create: isContentAdmin,
    update: isContentAdmin,
    delete: isContentAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
