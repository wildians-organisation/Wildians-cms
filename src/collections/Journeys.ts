import type { CollectionConfig } from 'payload'

export const Journeys: CollectionConfig = {
    slug: 'journeys',
    admin: {
        useAsTitle: 'name',
        description: 'Vas-y Eléa, ponds nous des supers parcours !!',
        listSearchableFields: ['name'],
    },
    auth: true,
    fields: [
        {
            name: 'name',
            type: 'richText',
            required: true,
        },
        {
            name: 'description',
            type: 'text',
            required: true,
        },
        // {
        //     name: 'image',
        //     type: 'upload',
        //     relationTo: 'media',
        //     required: false,
        // },
    ],
}
