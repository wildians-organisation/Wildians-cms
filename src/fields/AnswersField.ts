import { Field } from "payload"

const answersField = (options: {
  name: string
  label?: string
  required?: boolean
  localized?: boolean
}): Field => {
  return {
    name: options.name,
    type: 'json',
    label: options.label || 'Les réponses possibles',
    required: options.required,
    localized: options.localized,
    admin: {
      components: {
        Field: '/components/AnswersFieldComponent',
      },
    },
    // Optional: validate that it's an array
    validate: (value) => {
      if (!Array.isArray(value)) {
        return 'Answers must be an array'
      }
      return true
    },
  }
}

export default answersField;