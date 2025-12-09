'use client';

import React, { useCallback, useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useField, FieldLabel, FieldError, FieldDescription } from '@payloadcms/ui';
import { TextFieldClientProps, Validate } from 'payload';
import './styles.css';

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
        validate,
    } = props;

    // 1. Validation Logic
    const memoizedValidate: Validate = useCallback((value, options) => {
        if (typeof validate === 'function') {
            return validate(value, {
                ...options, required,
                type: 'text',
                name: ''
            });
        }
        if (required && (!value || String(value).trim().length === 0)) {
            return 'This field is required.';
        }
        return true;
    }, [validate, required]);

    const { value: payloadValue, setValue, showError, errorMessage } = useField<string>({
        path,
        validate: memoizedValidate,
    });

    const [localValue, setLocalValue] = useState(payloadValue || '');

    useEffect(() => {
        if (payloadValue !== undefined && payloadValue !== localValue) {
            if (!localValue || localValue === '') {
                setLocalValue(payloadValue);
            }
        }
    }, [payloadValue]);

    const handleChange = (val: string | undefined) => {
        const newValue = val || '';

        setLocalValue(newValue);

        setValue(newValue);
    };

    const classes = [
        'field-type',
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

            <div className="field-type__wrap">
                <FieldError path={path} showError={showError} message={errorMessage} />

                <div className="markdown-input-container">
                    <MDEditor
                        value={localValue}
                        onChange={handleChange}
                        height={300}
                        preview="live"
                        style={{
                            '--md-editor-fullscreen-z-index': '9999'
                        } as React.CSSProperties}
                        textareaProps={{
                            placeholder: placeholder ? String(placeholder) : undefined,
                            disabled: readOnly,
                        }}
                    />
                </div>

                <FieldDescription path={path} description={description} />
            </div>
        </div>
    );
};

export default MarkdownField;