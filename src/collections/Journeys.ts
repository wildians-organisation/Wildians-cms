import type { CollectionConfig } from 'payload'
import { Universes } from './Universes'

export const Journeys: CollectionConfig = {
    slug: 'journeys',
    admin: {
        useAsTitle: 'name',
        description: 'Vas-y Eléa, ponds nous des supers parcours !!',
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
        },
        {
            name: 'description',
            type: 'text',
            required: true,
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
        // {
        //     name: 'image',
        //     type: 'upload',
        //     relationTo: 'media',
        //     required: false,
        // },
    ],
}
