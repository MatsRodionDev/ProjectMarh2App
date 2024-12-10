import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import userApi from '../../services/userApi';
import projectApi from '../../services/projectApi';
import { toast } from 'react-toastify';

const AddUsersToProject = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const allUsers = await userApi.getAllUsers();
            setUsers(allUsers);
        };

        const fetchProjectUsers = async () => {
            const projectData = await projectApi.getProjectById(projectId);
            setProjectUsers(projectData.Users);
        };

        const fetchData = async () => {
            await fetchUsers();
            await fetchProjectUsers();
            setLoading(false);
        };

        fetchData();
    }, [projectId]);

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddUserToProject = async (userId) => {
        try {
            await projectApi.addUserToProject(projectId, userId);
            setProjectUsers(prevUsers => [...prevUsers, users.find(user => user.id === userId)]);
            toast.success('User successfully added to project!');
        } catch (error) {
            toast.error('Failed to add user: ' + (error.message || 'An error occurred'));
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center font-weight-bold mb-4">Add Users to Project</h2>
            <Form.Control
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
                style={{
                    borderRadius: '5px',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
            />
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Card className="shadow-sm mb-4" style={{ height: '300px', overflowY: 'auto', borderRadius: '10px' }}>
                    <Card.Body>
                        <Row>
                            {filteredUsers.map(user => {
                                const isUserInProject = projectUsers.some(projectUser => projectUser.id === user.id);
                                return (
                                    <Col md={4} key={user.id} className="mb-3">
                                        <Card className="shadow-sm" style={{ borderRadius: '10px', transition: 'transform 0.2s' }}>
                                            <Card.Body>
                                                <Card.Title className="font-weight-bold">
                                                    {user.firstName} {user.lastName}
                                                </Card.Title>
                                                <Card.Text className="text-muted">{user.email}</Card.Text>
                                                {isUserInProject ? (
                                                    <Button variant="secondary" disabled>
                                                        Already in Project
                                                    </Button>
                                                ) : (
                                                    <Button variant="primary" onClick={() => handleAddUserToProject(user.id)}>
                                                        Add to Project
                                                    </Button>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Card.Body>
                </Card>
            )}
            <Button variant="secondary" onClick={() => navigate(-1)} className="mt-4">
                Back
            </Button>
        </Container>
    );
};

export default AddUsersToProject;