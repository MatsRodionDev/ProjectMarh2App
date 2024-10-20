import React from "react";
import {Container, Form, Card, Button, Row, FloatingLabel} from 'react-bootstrap';
import {NavLink, useLocation} from "react-router-dom"
import RegistrationForm from "./components/RegistrationForm";
import AuthorizationForm from "./components/AuthorizationFrom";
import { LOGIN_ROUTE } from "../../utils/consts";

const Auth = () => {
    const location = useLocation().pathname

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            {
                location === LOGIN_ROUTE 
                ?
                <AuthorizationForm/>
                :
                <RegistrationForm/>
            }
        </Container>
    )
}

export default Auth;