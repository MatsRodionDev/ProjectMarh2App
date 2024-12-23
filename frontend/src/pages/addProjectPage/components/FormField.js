import React from 'react';
import { Form } from 'react-bootstrap';

const FormField = ({ controlId, label, type = 'text', as, rows, placeholder, value, onChange, required = false }) => (
    <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            as={as}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    </Form.Group>
);

export default FormField;
