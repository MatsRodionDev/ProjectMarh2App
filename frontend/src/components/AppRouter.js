import React from "react";
import { Route, Routes} from 'react-router-dom'
import { workerRoutes, publishRoutes, managerRoutes, adminRoutes } from "../routes";


const AppRouter = () => {
    
    return (
        <Routes>
            {publishRoutes.map(({path, Component}) => 
                <Route key={path} path={path} Component={Component} exact/>
            )}
        </Routes>
    )
}

export default AppRouter;