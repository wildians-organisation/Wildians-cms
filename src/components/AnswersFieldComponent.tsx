'use client'

import { useField, useLocale } from '@payloadcms/ui'
import { Validate } from 'payload'
import React, { useCallback, useEffect, useState } from 'react'

// Helper to create unique keys
const generateId = () => Math.random().toString(36).substr(2, 9)

type AnswerRow = {
  id: string
  text: string
}

// We accept 'field' prop now to check if it is localized
type Props = {
  path: string
  field: {
    localized?: boolean
    validate?: Validate,
    [key: string]: any
  }
}

const AnswersFieldComponent: React.FC<Props> = ({ path, field }) => {
  const { value, setValue } = useField<string[]>({ path, validate: field.validate })
  const locale = useLocale()
  
  const [rows, setRows] = useState<AnswerRow[]>([])

  useEffect(() => {
    if (Array.isArray(value) && value.length > 0 && rows.length === 0) {
      setRows(value.map((text) => ({ id: generateId(), text })))
    }
  }, [value, rows.length])

  const syncToPayload = (currentRows: AnswerRow[]) => {
    const cleanArray = currentRows.map((r) => r.text).filter((text) => text.trim() !== '')
    setValue(cleanArray)
  }

  const addAnswer = useCallback(() => {
    const newRows = [...rows, { id: generateId(), text: '' }]
    setRows(newRows)
    syncToPayload(newRows)
  }, [rows, setValue])

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

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '10px'}}>
        Les réponses possibles
        {/* Only show locale suffix if the field is actually localized in config */}
        {field.localized && (
          <span style={{ marginLeft: '5px', fontWeight: 'normal' }}>
            — {locale.code}
          </span>
        )}
      </label>

      {rows.map((row, index) => (
        <div
          key={row.id}
          style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}
        >
          <span
            style={{
              fontWeight: 'bold',
              color: '#666',
              minWidth: '20px',
              textAlign: 'right',
            }}
          >
            {index + 1}.
          </span>

          <input
            type="text"
            value={row.text}
            onChange={(e) => updateLocalText(row.id, e.target.value)}
            onBlur={handleBlur}
            placeholder={`Réponse ${index + 1}`}
            style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button
            type="button"
            onClick={() => removeAnswer(row.id)}
            style={{
              padding: '8px 12px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addAnswer}
        style={{
          padding: '8px 16px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
          marginLeft: '30px', // Aligned with input (skipping the number width)
        }}
      >
        + Ajouter une réponse
      </button>
    </div>
  )
}

export default AnswersFieldComponent;