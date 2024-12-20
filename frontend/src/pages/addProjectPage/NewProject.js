import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import projectApi from "../../services/projectApi"; 
import CustomerApi from "../../services/customerApi"; 
import ProjectTypeApi from "../../services/projectTypeApi"; 

const NewProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(''); 
    const [customerId, setCustomerId] = useState(null);
    const [projectTypeId, setProjectTypeId] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchCustomers();
            await fetchProjectTypes();
        };

        fetchData();
    }, []);

    const fetchCustomers = async () => {
        try {
            const data = await CustomerApi.getAllCustomers();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchProjectTypes = async () => {
        try {
            const data = await ProjectTypeApi.getAllProjectTypes();
            setProjectTypes(data);
        } catch (error) {
            console.error('Error fetching project types:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!customerId || !projectTypeId || !deadline) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            const newProject = {
                name,
                description,
                deadline,
                customerId,
                projectTypeId
            };

            await projectApi.createProject(newProject);
            toast.success('Project created successfully!'); 
            resetForm(); 
        } catch (error) {
            toast.error(error.message || 'Error creating project');
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setDeadline('');
        setCustomerId(null);
        setProjectTypeId(null);
    };

    return (
        <Container className="mt-5 p-4 border rounded shadow-lg" style={{ maxWidth: '600px', backgroundColor: '#f8f9fa' }}>
            <h1 className="text-center mb-4" style={{ color: '#007bff' }}>Create New Project</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProjectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter project name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formProjectDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter project description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formProjectDeadline">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Select deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCustomerSelect">
                    <Form.Label>Select Customer</Form.Label>
                    <Form.Select
                        value={customerId || ""}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                    >
                        <option value="">Select a customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formProjectTypeSelect">
                    <Form.Label>Select Project Type</Form.Label>
                    <Form.Select
                        value={projectTypeId || ""}
                        onChange={(e) => setProjectTypeId(e.target.value)}
                        required
                    >
                        <option value="">Select a project type</option>
                        {projectTypes.map((projectType) => (
                            <option key={projectType.id} value={projectType.id}>
                                {projectType.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '20px' }}>
                    Create Project
                </Button>
            </Form>
            <ToastContainer />
        </Container>
    );
};

export default NewProject;