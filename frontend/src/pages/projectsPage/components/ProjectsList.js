import React from "react";
import ProjectCard from "./ProjectCard.js";

const ProjectsList = () => {
    const projects = [
        {
            id: 1,
            name: "name 1",
            customerName: "customer 1",
            description: "description 1"
        },
        {
            id: 2,
            name: "name 2",
            customerName: "customer 2",
            description: "description 2"
        }
    ];
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