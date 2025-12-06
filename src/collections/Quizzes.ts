import type { Block, Field } from 'payload'

export const QuestionsField: Field = {
  type: 'array',
  name: 'questions',
  label: 'Questions du quiz',
  minRows: 1,
  maxRows: 30,
  fields: [
    {
      name: 'question',
      label: 'La question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answers',
      label: 'Les réponses possibles',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'anwswer',
      label: 'La bonne réponse',
      type: 'number',
      required: true,
      localized: true,
    },
    {
      name: 'explanation',
      label: 'Explication',
      type: 'richText',
      localized: true,
    },
  ],
}

export const Quizzes: Block = {
  slug: 'quizzes',
  dbName: 'quizzes',
  fields: [
    {
      name: 'title',
      label: 'Titre du quiz',
      type: 'text',
      required: true,
      localized: true,
    },
    QuestionsField
  ],
}