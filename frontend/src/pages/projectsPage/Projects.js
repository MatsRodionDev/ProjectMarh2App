import { Container } from 'react-bootstrap';
import SortingMenu from "./components/SortingMenu";
import ProjectsList from "./components/ProjectsList";
import Page from "../../components/Page";
import React, { useEffect, useState } from "react";
import projectApi from "../../services/projectApi.js";
import CustomerApi from "../../services/customerApi.js";
import ProjectTypeApi from "../../services/projectTypeApi.js";
import { useSelector } from "react-redux";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [name, setName] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    const [projectTypeId, setProjectTypeId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

    const role = useSelector((state) => state.role.role)
    const pageSize = 3;

    useEffect(() => {
        async function fetchData() {
            await request(currentPage);
            await fetchCustomers();
            await fetchProjectTypes();
        }

        fetchData();
    }, []);

    const fetchCustomers = async () => {
        try {
            const data = await CustomerApi.getAllCustomers();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchProjectTypes = async () => {
        try {
            const data = await ProjectTypeApi.getAllProjectTypes();
            setProjectTypes(data);
        } catch (error) {
            console.error('Error fetching project types:', error);
        }
    };

    const request = async (page) => {
        const data = await projectApi.getProjects({
            name,
            isFinished,
            customerId,
            projectTypeId,
            page,
            pageSize
        });

        if (data) {
            setProjects(data.projects);
            setCurrentPage(data.currentPage);
            setTotal(data.totalPages);
        }
    };

    const handleIsFinished = (value) => {
        setIsFinished(value);
    };

    const handleProjectName = (value) => {
        setName(value);
    };

    const handleCustomerId = (id) => {
        setCustomerId(id);
    };

    const handleProjectTypeId = (id) => {
        setProjectTypeId(id);
    };

    const search = async () => {
        setCurrentPage(1);
        await request(1);
    };

    return (
        <div>
            <Container 
                className="d-flex flex-column align-items-center pt-3 pb-3"
                style={{ maxWidth: '100%', padding: '0 15px' }} // Адаптивная ширина
            >
                <SortingMenu
                    isFinished={isFinished}
                    handleIsFinished={handleIsFinished}
                    handleProjectName={handleProjectName}
                    projectName={name}
                    search={search}
                    customers={customers} 
                    handleCustomerId={handleCustomerId} 
                    projectTypes={projectTypes} 
                    handleProjectTypeId={handleProjectTypeId} 
                    isAdmin={role == 'Admin'}
                /> 
                <ProjectsList projects={projects} />
                <Page pageNumber={currentPage} pagesCount={total} handlePageClick={request} />
            </Container>
        </div>
    );
}

export default Projects;