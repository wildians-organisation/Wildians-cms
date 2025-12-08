import type { CollectionConfig } from 'payload'
import { isContentAdmin, isContentReviewer } from '../access/roles'
import { Lessons } from './Lessons'

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
  versions: {
    maxPerDoc: 50,
    drafts: true,
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
      label: 'Capsules du parcours',
      type: 'blocks',
      minRows: 1,
      maxRows: 20,
      blocks: [Lessons],
    },
  ]
}
