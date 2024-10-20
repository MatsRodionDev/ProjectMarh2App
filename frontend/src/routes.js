import Auth from "./pages/authPage/auth"
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const publishRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]
export const workerRoutes = [
    
]
export const managerRoutes = [
    
]
export const adminRoutes = [
    
]