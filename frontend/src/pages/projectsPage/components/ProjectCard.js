import React from "react";
import { Card, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate(); // Получаем функцию navigate
    const account = useSelector((state) => state.account.account)
    const role = useSelector((state) => state.role.role)

    if (!project) {
        return <div>No project data available.</div>; // Отображаем сообщение об отсутствии данных
    }


    return (
        <Card style={{ width: '100%' }} className="mb-3">
            <Card.Header>{project.name}</Card.Header>
            <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text>{project.description}</Card.Text>
                <Card.Text>
                    <strong>Status: </strong>{project.isFinished ? 'Finished' : 'In Progress'}
                </Card.Text>
                <Card.Text>
                    <strong>Customer: </strong>{project.Customer?.name || 'N/A'}
                </Card.Text>
                <Card.Text>
                    <strong>Project Type: </strong>{project.ProjectType?.name || 'N/A'}
                </Card.Text>
                {/* Условное отображение кнопки */}
                {(role == 'Admin' || (!project.isFinished && project.Users.find(u => u.id == account.id))) && (
                    <Button variant="primary" onClick={() => navigate(`/projects/${project.id}`)}>View Details</Button>
                )}
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;