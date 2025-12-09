import { Field } from "payload"

const markdownField = (options: {
  name: string
  label?: string
  required?: boolean
  localized?: boolean
}): Field => {
  return {
    name: options.name,
    type: 'textarea',
    label: options.label,
    required: options.required,
    localized: options.localized,
    admin: {
      components: {
        Field: '/components/MarkdownField.tsx',
      },
    },
  }
}

export default markdownField;