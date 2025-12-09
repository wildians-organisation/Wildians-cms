'use client'; // Essential for Payload v3

import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useField } from '@payloadcms/ui'; // For v3. Use 'payload/components/forms' for v2

const MarkdownField: React.FC<any> = (props) => {
  const { 
    path, 
    label, 
    required, 
    validate, 
    admin: { 
      description, 
      placeholder, 
      style, 
      className, 
      readOnly 
    } = {} 
  } = props;

  // 1. Pass 'validate' to useField to ensure Payload's validation logic runs
  const { value, setValue, errorMessage, showError } = useField<string>({ 
    path, 
    validate 
  });

  const classes = [
    'field-type',
    'markdown-field',
    className,
    showError && 'error',
    readOnly && 'read-only',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {/* 2. Standard Label Rendering */}
      <label className="field-label" htmlFor={path}>
        {label}
        {required && <span className="required">*</span>}
      </label>

      <div className="markdown-wrap" style={{ position: 'relative', zIndex: 0 }}>
        <MDEditor
          value={value || ''}
          onChange={(val) => {
            if (!readOnly) setValue(val || '');
          }}
          height={400}
          preview="live"
          textareaProps={{
            placeholder: placeholder ? String(placeholder) : undefined,
            disabled: readOnly,
          }}
        />
      </div>

      {/* 3. Standard Error Message */}
      {showError && (
        <div className="field-error">
          {errorMessage}
        </div>
      )}

      {/* 4. Standard Description */}
      {description && (
        <div className="field-description">
          {description}
        </div>
      )}
    </div>
  );
};

export default MarkdownField;