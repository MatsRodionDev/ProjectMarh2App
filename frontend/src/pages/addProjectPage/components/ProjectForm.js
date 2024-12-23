import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormField from './FormField';
import FormSelect from './FormSelect';

const ProjectForm = ({ customers, projectTypes, onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [projectTypeId, setProjectTypeId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!customerId || !projectTypeId || !deadline) {
            toast.error('Please fill in all required fields.');
            return;
        }
        onSubmit({ name, description, deadline, customerId, projectTypeId });
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setDeadline('');
        setCustomerId('');
        setProjectTypeId('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormField
                controlId="formProjectName"
                label="Project Name"
                type="text"
                placeholder="Enter project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <FormField
                controlId="formProjectDescription"
                label="Description"
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <FormField
                controlId="formProjectDeadline"
                label="Deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
            />
            <FormSelect
                controlId="formCustomerSelect"
                label="Select Customer"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                options={customers}
                optionLabel="name"
                placeholder="Select a customer"
                required
            />
            <FormSelect
                controlId="formProjectTypeSelect"
                label="Select Project Type"
                value={projectTypeId}
                onChange={(e) => setProjectTypeId(e.target.value)}
                options={projectTypes}
                optionLabel="name"
                placeholder="Select a project type"
                required
            />
            <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '20px' }}>
                Create Project
            </Button>
        </Form>
    );
};

export default ProjectForm;
