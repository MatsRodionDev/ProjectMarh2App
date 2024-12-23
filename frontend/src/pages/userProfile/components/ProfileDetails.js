import React from 'react';
import { Form } from 'react-bootstrap';

const ProfileDetails = ({ user }) => (
    <Form className="profile-form">
        <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={user.firstName} readOnly />
        </Form.Group>
        <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={user.lastName} readOnly />
        </Form.Group>
        <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={user.email} readOnly />
        </Form.Group>
    </Form>
);

export default ProfileDetails;
