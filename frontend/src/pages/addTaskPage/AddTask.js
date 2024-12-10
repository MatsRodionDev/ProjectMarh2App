import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import projectApi from "../../services/projectApi"; // Импортируем ProjectApi
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Импорт стилей для уведомлений

const AddTask = () => {
    const { id: projectId } = useParams(); // Получение projectId из URL
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await projectApi.createTaskToProject(projectId, {
                title: taskName,
                description,
                deadline,
            });
            toast.success('Task added successfully!'); // Успешное уведомление
            navigate(`/project/${projectId}`); // Перенаправление на страницу проекта после добавления задачи
        } catch (error) {
            toast.error(error.message || 'An error occurred while adding the task.'); // Уведомление об ошибке
        }
    };

    return (
        <Container className="pt-4" style={{ maxWidth: '600px' }}>
            <h2 className="text-center mb-4">Add New Task</h2>
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
                        style={{ borderRadius: '4px', border: '1px solid #ced4da' }}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4" style={{ width: '100%', borderRadius: '4px' }}>
                    Add Task
                </Button>
            </Form>
            <ToastContainer /> {/* Контейнер для уведомлений */}
        </Container>
    );
};

export default AddTask;