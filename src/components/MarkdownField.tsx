'use client';

import React, { useCallback } from 'react';
import MDEditor from '@uiw/react-md-editor';
import {
    useField,
    FieldLabel,
    FieldError,
    FieldDescription
} from '@payloadcms/ui';
import type { TextFieldClientProps, Validate } from 'payload';

import './styles.css';

const fieldBaseClass = 'field-type';

const MarkdownField: React.FC<TextFieldClientProps> = (props) => {
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
        validate, // Server-side validator (undefined on client)
    } = props;

    const memoizedValidate: Validate = useCallback((value, options) => {
        if (typeof validate === 'function') {
            return validate(value, {
                ...options, required,
                type: 'text',
                name: ''
            });
        }
        // Fallback client-side validation
        if (required && (!value || String(value).trim().length === 0)) {
            return 'This field is required.';
        }
        return true;
    }, [validate, required]);

    const { value, setValue, showError, errorMessage } = useField<string>({
        path,
        validate: memoizedValidate,
    });

    const classes = [
        fieldBaseClass,
        'markdown-field',
        className,
        showError && 'error',
        readOnly && 'read-only',
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} style={style}>
            <FieldLabel
                label={label}
                required={required}
                localized={localized}
                path={path}
            />

            <div className={`${fieldBaseClass}__wrap`}>

                <FieldError
                    path={path}
                    showError={showError}
                    message={errorMessage}
                />

                <div className="markdown-input-container">
                    <MDEditor
                        value={value || ''}
                        onChange={(val) => {
                            if (!readOnly) setValue(val || '');
                        }}
                        height={300}
                        preview="live"
                        textareaProps={{
                            placeholder: placeholder ? String(placeholder) : undefined,
                            disabled: readOnly
                        }}
                    />
                </div>

                <FieldDescription
                    path={path}
                    description={description}
                />
            </div>
        </div>
    );
};

export default MarkdownField;