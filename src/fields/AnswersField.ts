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
    label: options.label,
    required: options.required,
    localized: options.localized,
    admin: {
      components: {
        Field: '/components/AnswersFieldComponent',
      },
    },
  }
}

export default answersField;