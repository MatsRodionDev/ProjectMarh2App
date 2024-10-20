import Auth from "./pages/authPage/auth"
import Projects from "./pages/projectsPage/Projects"
import { LOGIN_ROUTE, PROJECTS_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const publishRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PROJECTS_ROUTE,
        Component: Projects
    },
]
export const workerRoutes = [
    
]
export const managerRoutes = [
    
]
export const adminRoutes = [
    
]