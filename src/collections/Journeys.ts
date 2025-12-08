import type { CollectionConfig } from 'payload'
import { isContentAdmin, isContentReviewer } from '../access/roles'

export const Journeys: CollectionConfig = {
  slug: 'journeys',
  admin: {
    useAsTitle: 'name',
    description: 'Vas-y Eléa, ponds nous des supers parcours !!',
  },
  access: {
    read: isContentReviewer,
    create: isContentAdmin,
    update: isContentAdmin,
    delete: isContentAdmin,
  },
  fields: [
    {
      name: 'universe',
      label: 'Univers associé',
      type: 'relationship',
      relationTo: 'universes',
      required: true,
    },
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
      name: 'lessons',
      type: 'join',
      collection: 'lessons',
      on: 'journey',
      orderable: true,
      admin: {
        allowCreate: true,
      },
    },
  ],
}
