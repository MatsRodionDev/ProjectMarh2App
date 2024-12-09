import React from "react";
import ProjectCard from "./ProjectCard.js";
import projectApi from "../../../services/projectApi.js"

const ProjectsList = ({projects}) => {
    return (
        <>
            {
                projects.map((project) =>
                    <ProjectCard key={project.id} project={project}/>)
            }
        </>
    )
}

export default ProjectsList;