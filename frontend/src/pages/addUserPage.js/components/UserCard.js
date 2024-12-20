import React from 'react';
import { Card, Button } from 'react-bootstrap';

const UserCard = ({ user, isInProject, onAddUser }) => {
    return (
        <Card className="shadow-sm user-card">
            <Card.Body>
                <Card.Title className="font-weight-bold">
                    {user.firstName} {user.lastName}
                </Card.Title>
                <Card.Text className="text-muted">{user.email}</Card.Text>
                {isInProject ? (
                    <Button variant="secondary" disabled>
                        Already in Project
                    </Button>
                ) : (
                    <Button variant="primary" onClick={onAddUser}>
                        Add to Project
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default UserCard;
