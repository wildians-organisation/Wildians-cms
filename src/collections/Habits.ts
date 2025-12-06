import type { Block } from 'payload'

export const Habits: Block = {
  slug: 'habits',
  dbName: 'habits',
  fields: [
    {
      name: 'title',
      label: 'Le titre de l\'habitude',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      label: 'Description juste en dessous du titre',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'task',
      label: 'Le call to action',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'duration',
      label: 'Le nombre de jours pendant lesquels pratiquer cette habitude',
      type: 'number',
      min: 1,
      max: 99,
      required: true,
      admin: {
        placeholder: '4'
      },
    },
    {
      'type': 'row',
      fields: [
        {
          name: 'eco2Reduced',
          label: 'Le eqCo2 réduit par jour grâce à cette habitude (en grammes)',
          type: 'number',
          min: 1,
          max: 99,
          admin: {
            placeholder: '0.15'
          },
        },
        {
          name: 'moneySaved',
          label: 'Le montant économisé par jour grâce à cette habitude (en euros)',
          type: 'number',
          min: 1,
          max: 99,
          admin: {
            placeholder: '0.50'
          },
        },
      ]
    },
  ],
}
