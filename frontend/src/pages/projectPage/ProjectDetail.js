import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import projectApi from '../../services/projectApi';
import taskApi from '../../services/taskApi';
import { toast } from 'react-toastify';

const ProjectDetail = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userSearchTerm, setUserSearchTerm] = useState('');

    const account = useSelector((state) => state.account.account);

    useEffect(() => {
        const fetchData = async () => {
            const projectData = await projectApi.getProjectById(projectId);
            setProject(projectData);
            setUsers(projectData.Users);
            setTasks(projectData.Tasks);
        };

        fetchData();
    }, [projectId]);

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const takenTasks = filteredTasks.filter(task => !task.isCompleted && task.userId);
    const unassignedTasks = filteredTasks.filter(task => !task.userId);
    const completedTasks = filteredTasks.filter(task => task.isCompleted);

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(userSearchTerm.toLowerCase())
    );

    const handleTakeTask = async (taskId) => {
        try {
            await taskApi.addUserToTask(taskId, account.id);
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === taskId ? { ...task, userId: account.id } : task
                )
            );
            toast.success('Task successfully taken!');
        } catch (error) {
            toast.error('Failed to take task: ' + (error.message || 'An error occurred'));
        }
    };

    const handleRejectTask = async (taskId) => {
        try {
            await taskApi.deleteUserFromTask(taskId, account.id);
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === taskId ? { ...task, userId: null } : task
                )
            );
            toast.success('Successfully rejected the task!');
        } catch (error) {
            toast.error('Failed to reject task: ' + (error.message || 'An error occurred'));
        }
    };

    const handleCompleteTask = async (taskId) => {
        try {
            await taskApi.closeTask(taskId);
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === taskId ? { ...task, isCompleted: true } : task
                )
            );
            toast.success('Task successfully completed!');
        } catch (error) {
            toast.error('Failed to complete task: ' + (error.message || 'An error occurred'));
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await taskApi.deleteTask(taskId);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            toast.success('Task successfully deleted!');
        } catch (error) {
            toast.error('Failed to delete task: ' + (error.message || 'An error occurred'));
        }
    };

    return (
        <Container className="mt-4">
            {project && (
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', color: '#343a40' }}>
                    {project.name}
                </h2>
            )}
            <Row>
                <Col md={6}>
                    <Card className="mb-3 shadow" style={{ borderRadius: '10px' }}>
                        <Card.Body>
                            {project && (
                                <>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Deadline: {new Date(project.deadline).toLocaleDateString()}
                                    </Card.Subtitle>
                                    <Card.Text style={{ fontSize: '1.1rem' }}>{project.description}</Card.Text>
                                    <Card.Text>
                                        <strong>Status:</strong> {project.isFinished ? 'Finished' : 'In Progress'}
                                    </Card.Text>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                        <Card className="mb-3 shadow" style={{ borderRadius: '10px' }}>
                            <Card.Body>
                                <Card.Title>Users</Card.Title>
                                <Form.Control
                                    type="text"
                                    placeholder="Search users..."
                                    value={userSearchTerm}
                                    onChange={(e) => setUserSearchTerm(e.target.value)}
                                    className="mb-3"
                                    style={{ borderRadius: '5px' }}
                                />
                                <div style={{ height: '250px', overflowY: 'auto', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map(user => (
                                            <Card key={user.id} className="mb-2" style={{ borderRadius: '8px' }}>
                                                <Card.Body>
                                                    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                                                    <Card.Text className="text-muted">{user.email}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        ))
                                    ) : (
                                        <Card.Text>No users found.</Card.Text>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                </Col>
                <Col md={6}>
                    <Card className="mb-3 shadow" style={{ borderRadius: '10px' }}>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <Card.Title>Tasks</Card.Title>
                                <Button 
                                    variant="primary" 
                                    onClick={() => navigate(`/project/${projectId}/add-task`)} 
                                    style={{ marginBottom: '10px' }} // Добавляем отступ
                                >
                                    Add Task
                                </Button>
                            </div>
                            <Form.Control
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mb-3"
                                style={{ borderRadius: '5px' }}
                            />
                            <Card className="mb-2 border-warning bg-warning bg-opacity-10" style={{ borderRadius: '10px' }}>
                                <Card.Body>
                                    <Card.Title>Taken Tasks</Card.Title>
                                    <div style={{ height: '250px', overflowY: 'auto', padding: '10px' }}>
                                        {takenTasks.length > 0 ? (
                                            takenTasks.map(task => (
                                                <Card className="mb-2" key={task.id} style={{ borderRadius: '8px', position: 'relative' }}>
                                                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                                        <Button variant="light" onClick={() => handleDeleteTask(task.id)} style={{ border: 'none', background: 'transparent' }}>
                                                            &times;
                                                        </Button>
                                                    </div>
                                                    <Card.Body>
                                                        <Card.Title>{task.title}</Card.Title>
                                                        <Card.Text>{task.description}</Card.Text>
                                                        {task.userId === account.id && (
                                                            <>
                                                                <Button variant="success" onClick={() => handleCompleteTask(task.id)} className="me-2">
                                                                    Complete Task
                                                                </Button>
                                                                <Button variant="danger" onClick={() => handleRejectTask(task.id)}>
                                                                    Reject Task
                                                                </Button>
                                                            </>
                                                        )}
                                                    </Card.Body>
                                                </Card>
                                            ))
                                        ) : (
                                            <Card.Text>No taken tasks found.</Card.Text>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className="mb-2 border-info bg-info bg-opacity-10" style={{ borderRadius: '10px' }}>
                                <Card.Body>
                                    <Card.Title>Unassigned Tasks</Card.Title>
                                    <div style={{ height: '250px', overflowY: 'auto', padding: '10px' }}>
                                        {unassignedTasks.length > 0 ? (
                                            unassignedTasks.map(task => (
                                                <Card className="mb-2" key={task.id} style={{ borderRadius: '8px', position: 'relative' }}>
                                                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                                        <Button variant="light" onClick={() => handleDeleteTask(task.id)} style={{ border: 'none', background: 'transparent' }}>
                                                            &times;
                                                        </Button>
                                                    </div>
                                                    <Card.Body>
                                                        <Card.Title>{task.title}</Card.Title>
                                                        <Card.Text>{task.description}</Card.Text>
                                                        <Button variant="success" onClick={() => handleTakeTask(task.id)}>
                                                            Take Task
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            ))
                                        ) : (
                                            <Card.Text>No unassigned tasks found.</Card.Text>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className="mb-2 border-danger bg-danger bg-opacity-10" style={{ borderRadius: '10px' }}>
                                <Card.Body>
                                    <Card.Title>Completed Tasks</Card.Title>
                                    <div style={{ height: '250px', overflowY: 'auto', padding: '10px' }}>
                                        {completedTasks.length > 0 ? (
                                            completedTasks.map(task => (
                                                <Card className="mb-2" key={task.id} style={{ borderRadius: '8px', position: 'relative' }}>
                                                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                                        <Button variant="light" onClick={() => handleDeleteTask(task.id)} style={{ border: 'none', background: 'transparent' }}>
                                                            &times;
                                                        </Button>
                                                    </div>
                                                    <Card.Body>
                                                        <Card.Title>{task.title}</Card.Title>
                                                        <Card.Text>{task.description}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            ))
                                        ) : (
                                            <Card.Text>No completed tasks found.</Card.Text>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProjectDetail;