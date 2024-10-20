import React from "react";
import {Container, Form, Card, Button, Row, FloatingLabel} from 'react-bootstrap';
import {NavLink, useLocation} from "react-router-dom"
import { LOGIN_ROUTE } from "../../../utils/consts";

const RegistrationForm = () => {
    const location = useLocation()

    return (
        <Card
            style={{width: 600}}
            className="p-5 ">
            <h2 className="m-auto mb-3">Registration</h2>
            <Form
                className="d-flex flex-column">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Nickname"
                    className="mb-3"
                >
                    <Form.Control type="name" placeholder="Name" />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <Row
                    className="ps-3 pe-3">
                    <div>Do you already have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink> </div>
                    <Button  className="mt-3">
                    Register
                    </Button>
                </Row>            
            </Form>
        </Card> 
    )
}

export default RegistrationForm;