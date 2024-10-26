import React from "react";
import { Route, Routes} from 'react-router-dom'
import { workerRoutes, publishRoutes, managerRoutes, adminRoutes } from "../routes";
import { useSelector } from 'react-redux';

const AppRouter = () => {
    const role = useSelector((state) => state.role.role)

    return (
        <Routes>
            {publishRoutes.map(({path, Component}) => 
                <Route key={path} path={path} Component={Component} exact/>
            )}
            {
                role == 'Admin' && adminRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} Component={Component} exact/>
            )}
        </Routes>
    )
}

export default AppRouter;