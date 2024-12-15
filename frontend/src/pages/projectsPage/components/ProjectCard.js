import React from "react";
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate(); // Получаем функцию navigate

    const handleViewDetails = () => {
        navigate(`/project/${project.id}`); // Изменяем URL на project/:id
    };

    return (
        <Card style={{ width: '100%' }} className="mb-3">
            <Card.Header>{project.name}</Card.Header>
            <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Deadline: {new Date(project.deadline).toLocaleDateString()}</Card.Subtitle>
                <Card.Text>{project.description}</Card.Text>
                <Card.Text>
                    <strong>Status: </strong>{project.isFinished ? 'Finished' : 'In Progress'}
                </Card.Text>
                {/* Условное отображение кнопки */}
                {!project.isFinished && (
                    <Button variant="primary" onClick={handleViewDetails}>View Details</Button>
                )}
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;