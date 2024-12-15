import React, { useState } from "react";
import { Form, Card, Button, Row, FloatingLabel } from 'react-bootstrap';
import { NavLink, useLocation } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../../../utils/consts";

const AuthorizationForm = ({ login }) => {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onLogin = async () => {
        // Валидация email
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Валидация пароля
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setError(''); // Сброс ошибки
        console.log(email + ' ' + password);
        await login(email, password);
        setEmail('');
        setPassword('');
    };

    return (
        <Card style={{ width: 600 }} className="p-5 ">
            <h2 className="m-auto mb-3">Authorization</h2>
            <Form className="d-flex flex-column">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </FloatingLabel>
                {error && <div className="text-danger mt-2">{error}</div>}
                <Row className="ps-3 pe-3">
                    <div>Do you have no account? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink></div>
                    <Button
                        className="mt-3"
                        onClick={onLogin}>
                        Login
                    </Button>
                </Row>
            </Form>
        </Card>
    );
};

export default AuthorizationForm;