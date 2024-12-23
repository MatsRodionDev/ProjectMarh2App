import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import projectApi from '../../services/projectApi';
import TaskForm from './components/TaskForm';

const AddTask = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();

    const handleTaskSubmit = async ({ taskName, description, deadline }) => {
        try {
            await projectApi.createTaskToProject(projectId, {
                title: taskName,
                description,
                deadline,
            });
            toast.success('Task added successfully!');
            navigate(`/projects/${projectId}`);
        } catch (error) {
            toast.error(error.message || 'An error occurred while adding the task.');
        }
    };

    return (
        <Container className="pt-4" style={{ maxWidth: '600px' }}>
            <h2 className="text-center mb-4">Add New Task</h2>
            <TaskForm onSubmit={handleTaskSubmit} />
            <ToastContainer />
        </Container>
    );
};

export default AddTask;
