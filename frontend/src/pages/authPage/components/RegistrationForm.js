import React, { useState } from "react";
import {Container, Form, Card, Button, Row, FloatingLabel} from 'react-bootstrap';
import {NavLink, useLocation} from "react-router-dom"
import { LOGIN_ROUTE } from "../../../utils/consts";

const RegistrationForm = ({ register }) => {
    const location = useLocation()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleFirstNameChange = (e) => {
        const value = e.target.value

        setFirstName(value)
    } 

    const handleLastNameChange = (e) => {
        const value = e.target.value

        setLastName(value)
    } 

    const handleEmailChange = (e) => {
        const value = e.target.value

        setEmail(value)
    } 

    const handlePasswordChange = (e) => {
        const value = e.target.value

        setPassword(value)
    } 

    const onRegister = async () => {
        await register(firstName, lastName,email, password)

        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
    }

    return (
        <Card
            style={{width: 600}}
            className="p-5 ">
            <h2 className="m-auto mb-3">Registration</h2>
            <Form
                className="d-flex flex-column">
                <FloatingLabel
                    controlId="floatingInput"
                    label="First name"
                    className="mb-3"
                >
                    <Form.Control type="fistname" placeholder="First name" 
                        value={firstName}
                        onChange={handleFirstNameChange}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Last name"
                    className="mb-3"
                >
                    <Form.Control type="lastname" placeholder="Last name" 
                        value={lastName}
                        onChange={handleLastNameChange}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com"
                        value={email} 
                        onChange={handleEmailChange}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password"
                        value={password} 
                        onChange={handlePasswordChange}/>
                </FloatingLabel>
                <Row
                    className="ps-3 pe-3">
                    <div>Do you already have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink> </div>
                    <Button  className="mt-3"
                        onClick={onRegister}>
                    Register
                    </Button>
                </Row>            
            </Form>
        </Card> 
    )
}

export default RegistrationForm;