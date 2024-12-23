import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const TaskForm = ({ onSubmit }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!deadline) {
            toast.error('Deadline is required.');
            return;
        }
        onSubmit({ taskName, description, deadline });
    };

    return (
        <Form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                    style={{ borderRadius: '4px', border: '1px solid #ced4da' }}
                />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ borderRadius: '4px', border: '1px solid #ced4da' }}
                />
            </Form.Group>

            <Form.Group controlId="formDeadline" className="mt-3">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                    style={{ borderRadius: '4px', border: '1px solid #ced4da' }}
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4" style={{ width: '100%', borderRadius: '4px' }}>
                Add Task
            </Button>
        </Form>
    );
};

export default TaskForm;
