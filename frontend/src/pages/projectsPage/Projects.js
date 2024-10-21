import React from "react";
import { Container} from 'react-bootstrap';
import SortingMenu from "./components/SortingMenu";
import ProjectsList from "./components/ProjectsList";
import AdminUserPage from "../adminUsersPage/AdminUserPage";

const Projects = () => {
    return (
        <div>
           <Container 
                className="d-flex flex-column align-items-center pt-3 pb-3"
                style={{height: window.innerHeight - 54, width: 600}}
            >
                <SortingMenu/>
                <ProjectsList/>
            </Container>
            <AdminUserPage/>
        </div>
    )
}

export default Projects;