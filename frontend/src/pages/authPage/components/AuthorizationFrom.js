import React from "react";
import {Container, Form, Card, Button, Row, FloatingLabel} from 'react-bootstrap';
import {NavLink, useLocation} from "react-router-dom"
import { REGISTRATION_ROUTE } from "../../../utils/consts";

const AuthorizationForm = () => {
    const location = useLocation()

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
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <Row
                    className="ps-3 pe-3">
                    <div>Do you have no account? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink></div>
                    <Button  className="mt-3">
                    Register
                    </Button>
                </Row>            
            </Form>
        </Card> 
    )
}

export default AuthorizationForm;