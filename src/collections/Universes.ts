import type { CollectionConfig } from 'payload'
import { isContentAdmin, isContentReviewer } from '../access/roles'

export const Universes: CollectionConfig = {
  slug: 'universes',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isContentReviewer,
    create: isContentAdmin,
    update: isContentAdmin,
    delete: isContentAdmin,
  },
  fields: [
    {
      name: 'name',
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
      name: 'journeys',
      label: 'Tout les parcours dans cet univers',
      type: 'join',
      collection: 'journeys',
      on: 'universe',
      orderable: true,
      admin: {
        allowCreate: true,
      },
    },
  ],
}
