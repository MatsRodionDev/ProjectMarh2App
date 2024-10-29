import { Container} from 'react-bootstrap';
import SortingMenu from "./components/SortingMenu";
import ProjectsList from "./components/ProjectsList";
import Page from "../../components/Page";
import React, { useEffect, useState } from "react";
import projectApi from "../../services/projectApi.js"

const Projects = () => {
    const [projects, setProjects] = useState([])
    const [name, setName] = useState('')
    const [isFinished, setIsFinished] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState(0)

    const pageSize = 1

    useEffect(() => {
        async function fetchData() {
            await handlePageClick(currentPage)
        }

        fetchData();
    },[])

    const handlePageClick = async (page) => {
        const data = await projectApi.getProjects({
            name,
            isFinished,
            page,
            pageSize
        })

        console.log(data)
        
        if(data) {
            setProjects(data.projects)
            setCurrentPage(data.currentPage)
            setTotal(data.total)
        }
        
    } 

    return (
        <div>
           <Container 
                className="d-flex flex-column align-items-center pt-3 pb-3"
                style={{height: window.innerHeight - 54, width: 600}}
            >
                <SortingMenu/> 
                <ProjectsList projects={projects}/>
                <Page pageNumber={currentPage} pagesCount={total} handlePageClick={handlePageClick}/>
            </Container>
        </div>
    )
}

export default Projects;