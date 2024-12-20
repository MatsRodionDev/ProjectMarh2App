import React from "react";
import { Container } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import AuthorizationForm from "./components/AuthorizationFrom";
import { LOGIN_ROUTE } from "../../utils/consts";
import userApi from "../../services/userApi";
import { useDispatch } from 'react-redux';
import { setRole } from "../../stores/slices/roleSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAccount } from "../../stores/slices/accountSlice";

const Auth = () => {
    const location = useLocation().pathname;
    const dispatch = useDispatch();

    const logIn = async (email, password) => {
        const response = await userApi.login(email, password);
        
        if (!response) {
            toast.error("Login failed. Please check your credentials."); 
            return;
        }

        dispatch(setRole(response.roles));
        dispatch(setAccount(response));
    };

    const registration = async (firstName, lastName, email, password) => {
        const response = await userApi.registration(firstName, lastName, email, password);

        if (!response) {
            toast.error(`Registration failed. User with this email already exists`);
            return;
        }

        dispatch(setRole(response.roles));
        dispatch(setAccount(response));
    };

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}>
            {
                location === LOGIN_ROUTE 
                ?
                <AuthorizationForm login={logIn} />
                :
                <RegistrationForm register={registration} />
            }
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </Container>
    );
}

export default Auth;