import React, { useState } from "react";
import { Form, Card, Button, Row, FloatingLabel} from 'react-bootstrap';
import {NavLink, useLocation} from "react-router-dom"
import { REGISTRATION_ROUTE } from "../../../utils/consts";

const AuthorizationForm = ({ login }) => {
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleEmailChange = (e) => {
        const value = e.target.value

        setEmail(value)
    } 

    const handlePasswordChange = (e) => {
        const value = e.target.value

        setPassword(value)
    } 

    const onLogin = async () => {
        console.log(email + ' ' + password)
        await login(email, password)

        setEmail('')
        setPassword('')
    }

    return (
        <Card
            style={{width: 600}}
            className="p-5 ">
            <h2 className="m-auto mb-3">Authorization</h2>
            <Form
                className="d-flex flex-column">
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
                <Row
                    className="ps-3 pe-3">
                    <div>Do you have no account? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink></div>
                    <Button  
                        className="mt-3"
                        onClick={onLogin}>
                    Register
                    </Button>
                </Row>            
            </Form>
        </Card> 
    )
}

export default AuthorizationForm;