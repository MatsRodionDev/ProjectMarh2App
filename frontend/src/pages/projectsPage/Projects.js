import React from "react";
import { Container} from 'react-bootstrap';
import SortingMenu from "./components/SortingMenu";
import ProjectsList from "./components/ProjectsList";

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
        </div>
    )
}

export default Projects;