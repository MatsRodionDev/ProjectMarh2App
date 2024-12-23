import React from 'react';
import { Form } from 'react-bootstrap';

const UserRoleSelect = ({ user, roles, updateUserRole }) => {
    const isAdmin = user.Role.name === 'Admin';
    return (
        <Form.Select
            defaultValue={user.Role.name}
            onChange={(e) => updateUserRole(user.id, e.target.value)}
            disabled={isAdmin}
        >
            {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
            ))}
        </Form.Select>
    );
};

export default UserRoleSelect;
