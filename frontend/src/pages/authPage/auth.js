import React from "react";
import {Container} from 'react-bootstrap';
import { useLocation} from "react-router-dom"
import RegistrationForm from "./components/RegistrationForm";
import AuthorizationForm from "./components/AuthorizationFrom";
import { LOGIN_ROUTE } from "../../utils/consts";
import userApi from "../../services/userApi";

const Auth = () => {
    const location = useLocation().pathname

    const logIn = async (email, password) => {
        const response = await userApi.login(email, password)
        console.log(response)
    }

    const registration = async (firstName, lastName, email, password) => {
        const response = await userApi.registration(
            firstName,
            lastName,
            email,
            password)
        
        console.log(response)
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            {
                location === LOGIN_ROUTE 
                ?
                <AuthorizationForm login={logIn}/>
                :
                <RegistrationForm register={registration}/>
            }
        </Container>
    )
}

export default Auth;