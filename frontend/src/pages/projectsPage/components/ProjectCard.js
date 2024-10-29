import React from "react";
import { Card, Button } from 'react-bootstrap';

const ProjectCard = ( {project} ) => {
    console.log(project)
    return (
        <Card style={{width: '100%'}} className="mb-3">
            <Card.Header>{project.name}</Card.Header>
                <Card.Body>
                    <Card.Title>{"Customer: " + `${project.deadline}`}</Card.Title>
                    <Card.Text>
                        {project.description}
                    </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default ProjectCard;