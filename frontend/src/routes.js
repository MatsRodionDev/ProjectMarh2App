import AddTask from "./pages/addTaskPage/AddTask"
import AddUsersToProject from "./pages/addUserPage.js/addUsersToProject"
import Auth from "./pages/authPage/auth"
import ProjectDetail from "./pages/projectPage/ProjectDetail"
import Projects from "./pages/projectsPage/Projects"
import { LOGIN_ROUTE, PROJECTS_ROUTE, REGISTRATION_ROUTE, PROJECT_ROUTE, ADD_TASK_ROUTE, ADD_USER_ROUTE } from "./utils/consts"

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
    {
        path: PROJECTS_ROUTE,
        Component: Projects
    },
    {
        path: PROJECT_ROUTE,
        Component: ProjectDetail
    },
    {
        path: ADD_TASK_ROUTE,
        Component: AddTask
    },
    {
        path: ADD_USER_ROUTE,
        Component: AddUsersToProject
    }
]   