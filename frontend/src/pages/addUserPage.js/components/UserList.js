import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UserCard from './UserCard';

const UserList = ({ users, projectUsers, searchTerm, onAddUser }) => {
    const filteredUsers = users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Row>
            {filteredUsers.map((user) => {
                const isUserInProject = projectUsers.some((projectUser) => projectUser.id === user.id);
                return (
                    <Col md={4} key={user.id} className="mb-3">
                        <UserCard
                            user={user}
                            isInProject={isUserInProject}
                            onAddUser={() => onAddUser(user.id)}
                        />
                    </Col>
                );
            })}
        </Row>
    );
};

export default UserList;
