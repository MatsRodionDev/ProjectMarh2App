import React from "react";
import {Container} from 'react-bootstrap';
import { useLocation} from "react-router-dom"
import RegistrationForm from "./components/RegistrationForm";
import AuthorizationForm from "./components/AuthorizationFrom";
import { LOGIN_ROUTE } from "../../utils/consts";
import userApi from "../../services/userApi";
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from "../../stores/slices/roleSlice";

const Auth = () => {
    const location = useLocation().pathname
    const dispatch = useDispatch();

    const logIn = async (email, password) => {
        const response = await userApi.login(email, password)
        
        if(!response) return

        dispatch(setRole(response.roles))
    }

    const registration = async (firstName, lastName, email, password) => {
        const response = await userApi.registration(
            firstName,
            lastName,
            email,
            password)
        
        if(!response) return

        dispatch(setRole(response.roles))
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