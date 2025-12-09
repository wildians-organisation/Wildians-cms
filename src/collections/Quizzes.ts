import answersField from '@/fields/AnswersField'
import markdownField from '@/fields/MarkdownField'
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
    answersField({
      name: 'answers',
      label: 'Les réponses possibles',
      required: true,
      localized: true,
    }),
    {
      name: 'correctAnswers',
      label: 'Réponses correctes (numéros séparés par des virgules, ex: 1,3)',
      type: 'text',
      required: true,
    },
    markdownField({
      name: 'explanation',
      label: 'Explication',
      required: true,
      localized: true,
    }),
  ],
}

export const Quizzes: Block = {
  slug: 'quizzes',
  dbName: 'quizzes',
  labels: {
    singular: 'Quiz',
    plural: 'Quizzes',
  },
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