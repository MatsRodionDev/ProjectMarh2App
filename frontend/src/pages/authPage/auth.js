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

const Auth = () => {
    const location = useLocation().pathname;
    const dispatch = useDispatch();

    const logIn = async (email, password) => {
        const response = await userApi.login(email, password);
        
        if (!response) {
            toast.error("Login failed. Please check your credentials."); // Уведомление об ошибке
            return;
        }

        dispatch(setRole(response.roles));
        toast.success("Logged in successfully!"); // Уведомление об успехе
    };

    const registration = async (firstName, lastName, email, password) => {
        const response = await userApi.registration(firstName, lastName, email, password);
        
        if (!response) {
            toast.error("Registration failed. Please try again."); // Уведомление об ошибке
            return;
        }

        dispatch(setRole(response.roles));
        toast.success("Registration successful! You can now log in."); // Уведомление об успехе
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