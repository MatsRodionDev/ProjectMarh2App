import { Component } from "react"
import AddTask from "./pages/addTaskPage/AddTask"
import AddUsersToProject from "./pages/addUserPage.js/addUsersToProject"
import Auth from "./pages/authPage/auth"
import ProjectDetail from "./pages/projectPage/ProjectDetail"
import Projects from "./pages/projectsPage/Projects"
import { LOGIN_ROUTE, PROJECTS_ROUTE, REGISTRATION_ROUTE, PROJECT_ROUTE, ADD_TASK_ROUTE, ADD_USER_ROUTE, USER_PROFILE, CREATE_PROJECT, UPDATE_PROJECT, PROJECT_REPORT, USERS_ROUTE } from "./utils/consts"
import UserProfile from "./pages/userProfile/UserProfile"
import NewProject from "./pages/addProjectPage/NewProject"
import UpdateProject from "./pages/UpdateProjectPage/UpdateProject"
import Reports from "./pages/check"
import ProjectReport from "./pages/projectReport/ProjectReport"
import UserTable from "./pages/usersTablePage/UserTable"

export const unauthorizedRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]
export const userRoutes = [
    {
        path: PROJECTS_ROUTE,
        Component: Projects
    },
    {
        path: USER_PROFILE,
        Component: UserProfile
    },
    {
        path: PROJECT_ROUTE,
        Component: ProjectDetail
    },
]
export const adminRoutes = [
    {
        path: PROJECTS_ROUTE,
        Component: Projects
    },
   
    {
        path: ADD_TASK_ROUTE,
        Component: AddTask
    },
    {
        path: ADD_USER_ROUTE,
        Component: AddUsersToProject
    },
    {
        path: USER_PROFILE,
        Component: UserProfile
    },
    {
        path: CREATE_PROJECT,
        Component: NewProject
    },
    {
        path: UPDATE_PROJECT,
        Component: UpdateProject
    },
    {
        path: PROJECT_ROUTE,
        Component: ProjectDetail
    },
    {
        path: PROJECT_REPORT,
        Component: ProjectReport
    },
    {
        path: USERS_ROUTE,
        Component: UserTable
    }
]   