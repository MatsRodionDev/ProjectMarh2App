import React from 'react';
import { Form } from 'react-bootstrap';

const FormSelect = ({ controlId, label, value, onChange, options, optionLabel, placeholder, required = false }) => (
    <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Select value={value} onChange={onChange} required={required}>
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option[optionLabel]}
                </option>
            ))}
        </Form.Select>
    </Form.Group>
);

export default FormSelect;
