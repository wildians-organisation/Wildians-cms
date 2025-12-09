'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { 
  useField, 
  FieldLabel, 
  FieldError, 
  FieldDescription 
} from '@payloadcms/ui'
import { Validate, TextFieldClientProps } from 'payload'

import './styles.css' // We will add a tiny bit of CSS below

// Helper to generate unique IDs for React keys
const generateId = () => Math.random().toString(36).substr(2, 9)

type AnswerRow = {
  id: string
  text: string
}

const AnswersFieldComponent: React.FC<TextFieldClientProps> = (props) => {
  const {
    path,
    field: {
      label,
      required,
      localized,
      admin: {
        description,
        style,
        className,
        readOnly,
        placeholder,
      } = {},
    },
    validate, 
  } = props

  // 1. Validation Logic
  const memoizedValidate: Validate = useCallback((value, options) => {
    // Use server validation if available
    // if (typeof validate === 'function') {
    //   return validate(value, {
    //     ...options, required,
    //     type: 'text',
    //     name: ''
    //   })
    // }

    // Fallback: Check if we have at least one non-empty string

    if (required) {
        if (!Array.isArray(value) || value.length === 0 || value.every(s => !s || s.trim() === '')) {
            return 'At least one answer is required.'
        }
    }
    return true
  }, [validate, required])

  // 2. The Hook
  const { value, setValue, showError, errorMessage } = useField<string[]>({ 
      path, 
      validate: memoizedValidate 
  })

  console.log('should show error:', showError, 'message:', errorMessage)

  // 3. Local State Management
  const [rows, setRows] = useState<AnswerRow[]>([])

  // Sync upstream value -> local rows (Initial Load)
  useEffect(() => {
    if (Array.isArray(value) && value.length > 0 && rows.length === 0) {
      setRows(value.map((text) => ({ id: generateId(), text })))
    }
  }, [value]) // Deliberately removed rows.length to prevent loops

  // Sync local rows -> upstream value
  const syncToPayload = (currentRows: AnswerRow[]) => {
    // Only save the text strings to the DB
    const cleanArray = currentRows.map((r) => r.text)
    setValue(cleanArray)
  }

  // Handlers
  const addAnswer = useCallback(() => {
    const newRows = [...rows, { id: generateId(), text: '' }]
    setRows(newRows)
    // We don't sync immediately on add to avoid empty string validation errors
  }, [rows])

  const removeAnswer = useCallback((id: string) => {
    const newRows = rows.filter((r) => r.id !== id)
    setRows(newRows)
    syncToPayload(newRows)
  }, [rows, setValue])

  const updateLocalText = (id: string, text: string) => {
    const newRows = rows.map((r) => (r.id === id ? { ...r, text } : r))
    setRows(newRows)
  }

  const handleBlur = () => {
    syncToPayload(rows)
  }

  // 4. Styles & Classes
  const classes = [
    'field-type',
    'answers-field',
    className,
    showError && 'error',
    readOnly && 'read-only',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} style={style}>
      {/* STANDARD HEADER */}
      <FieldLabel 
        label={label} 
        required={required} 
        localized={localized} 
        path={path} 
      />

      <div className="field-type__wrap">
        {/* STANDARD ERROR */}
        <FieldError path={path} showError={showError} message={errorMessage} />

        {/* ROWS */}
        <div className="answers-list">
          {rows.map((row, index) => (
            <div key={row.id} className="answer-row">
              {/* Numbering */}
              <span className="answer-number">
                {index + 1}.
              </span>

              {/* NATIVE INPUT WRAPPER */}
              <div className="input-wrapper">
                <input
                  className="input-string" // Inherits global input styles
                  type="text"
                  value={row.text}
                  onChange={(e) => updateLocalText(row.id, e.target.value)}
                  onBlur={handleBlur}
                  placeholder={placeholder ? String(placeholder) : `Answer ${index + 1}`}
                  disabled={readOnly}
                />
              </div>

              {/* NATIVE BUTTON STYLE */}
              <button
                type="button"
                onClick={() => removeAnswer(row.id)}
                className="btn btn--style-secondary btn--icon-style-without-border answer-remove"
                disabled={readOnly}
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* ADD BUTTON */}
        <div className="answers-controls">
          <button
            type="button"
            onClick={addAnswer}
            disabled={readOnly}
            // Uses Payload's standard "Secondary Button" style
            className="btn btn--style-secondary btn--size-small"
          >
            + Add Answer
          </button>
        </div>

        {/* STANDARD DESCRIPTION */}
        <FieldDescription path={path} description={description} />
      </div>
    </div>
  )
}

export default AnswersFieldComponent