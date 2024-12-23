import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import userApi from '../../../services/userApi';
import { toast } from 'react-toastify';

const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password) => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        return '';
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordError('');

        const error = validatePassword(newPassword);
        if (error) {
            setPasswordError(error);
            return;
        }

        try {
            await userApi.changePassword(currentPassword, newPassword);
            toast.success('Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            toast.error('Failed to change password: ' + (error.message || 'An error occurred'));
        }
    };

    return (
        <Form onSubmit={handleChangePassword} className="change-password-form">
            <Form.Group controlId="formCurrentPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </Form.Group>
            {passwordError && <Alert variant="danger" className="mt-2">{passwordError}</Alert>}
            <Button variant="primary" type="submit" className="mt-3">
                Change Password
            </Button>
        </Form>
    );
};

export default ChangePasswordForm;
