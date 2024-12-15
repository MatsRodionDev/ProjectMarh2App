import React, { useState } from "react";
import { Card, Form, Button, Row, FloatingLabel } from 'react-bootstrap';
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE } from "../../../utils/consts";

const RegistrationForm = ({ register }) => {
    const location = useLocation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onRegister = async () => {
        // Валидация полей
        if (!firstName || !lastName || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setError(''); // Сброс ошибки
        await register(firstName, lastName, email, password);

        // Сброс полей формы
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };

    return (
        <Card style={{ width: 600 }} className="p-5 ">
            <h2 className="m-auto mb-3">Registration</h2>
            <Form className="d-flex flex-column">
                <FloatingLabel controlId="floatingFirstName" label="First name" className="mb-3">
                    <Form.Control type="text" placeholder="First name"
                        value={firstName} 
                        onChange={handleFirstNameChange} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingLastName" label="Last name" className="mb-3">
                    <Form.Control type="text" placeholder="Last name"
                        value={lastName} 
                        onChange={handleLastNameChange} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com"
                        value={email} 
                        onChange={handleEmailChange} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password"
                        value={password} 
                        onChange={handlePasswordChange} />
                </FloatingLabel>
                {error && <div className="text-danger mt-2">{error}</div>}
                <Row className="ps-3 pe-3">
                    <div>Do you already have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink></div>
                    <Button className="mt-3" onClick={onRegister}>
                        Register
                    </Button>
                </Row>
            </Form>
        </Card>
    );
};

export default RegistrationForm;