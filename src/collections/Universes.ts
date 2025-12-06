import type { CollectionConfig } from 'payload'

export const Universes: CollectionConfig = {
    slug: 'universes',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
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
        // {
        //     name: 'image',
        //     type: 'upload',
        //     relationTo: 'media',
        //     required: false,
        // },
    ],
}
