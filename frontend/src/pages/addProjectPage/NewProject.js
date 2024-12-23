import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import projectApi from '../../services/projectApi';
import CustomerApi from '../../services/customerApi';
import ProjectTypeApi from '../../services/projectTypeApi';
import ProjectForm from './components/ProjectForm';

const NewProject = () => {
    const [customers, setCustomers] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customersData = await CustomerApi.getAllCustomers();
                setCustomers(customersData);
                const projectTypesData = await ProjectTypeApi.getAllProjectTypes();
                setProjectTypes(projectTypesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (projectData) => {
        try {
            await projectApi.createProject(projectData);
            toast.success('Project created successfully!');
        } catch (error) {
            toast.error(error.message || 'Error creating project');
        }
    };

    return (
        <Container className="mt-5 p-4 border rounded shadow-lg" style={{ maxWidth: '600px', backgroundColor: '#f8f9fa' }}>
            <h1 className="text-center mb-4" style={{ color: '#007bff' }}>Create New Project</h1>
            <ProjectForm
                customers={customers}
                projectTypes={projectTypes}
                onSubmit={handleSubmit}
            />
            <ToastContainer />
        </Container>
    );
};

export default NewProject;
