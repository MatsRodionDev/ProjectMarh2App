import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import userApi from '../../services/userApi';
import projectApi from '../../services/projectApi';
import { toast } from 'react-toastify';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import './styles/AddUsersToProject.css';

const AddUsersToProject = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allUsers = await userApi.getAll();
                const projectData = await projectApi.getProjectById(projectId);
                setUsers(allUsers);
                setProjectUsers(projectData.Users);
            } catch (error) {
                toast.error('Failed to load data: ' + (error.message || 'An error occurred'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [projectId]);

    const handleAddUserToProject = async (userId) => {
        try {
            await projectApi.addUserToProject(projectId, userId);
            setProjectUsers((prevUsers) => [...prevUsers, users.find((user) => user.id === userId)]);
            toast.success('User successfully added to project!');
        } catch (error) {
            toast.error('Failed to add user: ' + (error.message || 'An error occurred'));
        }
    };

    return (
        <Container className="add-users-container mt-4">
            <h2 className="text-center font-weight-bold mb-4">Add Users to Project</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Card className="users-card shadow-sm mb-4">
                    <Card.Body>
                        <UserList
                            users={users}
                            projectUsers={projectUsers}
                            searchTerm={searchTerm}
                            onAddUser={handleAddUserToProject}
                        />
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
