import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { unauthorizedRoutes, userRoutes, adminRoutes } from "../routes";
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap'; 
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AppRouter = () => {
    const role = useSelector((state) => state.role.role);
    const loading = useSelector((state) => state.role.loading); // Получаем состояние загрузки
    const navigate = useNavigate();

    useEffect(() => {
        if(!role){
            navigate('/registration')
        }else{
            navigate('/projects')
        }
    },[role])   

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ); 
    }

    return (
        <Routes>
            {role === null && unauthorizedRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {role === 'Admin' && adminRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {role === 'User' && userRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} element={<Component />} exact />    
            )}
            {/* {
                role === null &&
                    <Route path="*" element={<Navigate to="/registration" />} />
            }   
            {
                role !== null &&
                    <Route path="*" element={<Navigate to="/projects" />} />
            }    */}
        </Routes>
    );
};

export default AppRouter;