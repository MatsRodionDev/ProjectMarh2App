import { useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaPlus } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const SortingMenu = ({
    handleIsFinished,
    isFinished,
    projectName,
    handleProjectName,
    search,
    customers,
    handleCustomerId,
    projectTypes,
    handleProjectTypeId,
    isAdmin // Проп для проверки роли администратора
}) => {
    const [show, setShow] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [selectedProjectTypeId, setSelectedProjectTypeId] = useState(null);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFormCheckChange = (event) => {
        handleIsFinished(!isFinished);
    };

    const handleFormControlChange = (event) => {
        handleProjectName(event.target.value);
    };

    const handleCustomerSelectChange = (event) => {
        const selectedId = event.target.value === "" ? null : event.target.value;
        setSelectedCustomerId(selectedId);
        handleCustomerId(selectedId);
    };

    const handleProjectTypeSelectChange = (event) => {
        const selectedId = event.target.value === "" ? null : event.target.value;
        setSelectedProjectTypeId(selectedId);
        handleProjectTypeId(selectedId);
    };

    return (
        <>
            <Form className="d-flex mb-5">
                <Form.Control
                    type="search"
                    placeholder="Search Project"
                    className="me-2"
                    aria-label="Search"
                    value={projectName}
                    onChange={handleFormControlChange}
                />
                <Button onClick={handleShow} className='me-2'>Filters</Button>
                <Button variant="outline-success" onClick={() => search()}>Search</Button>
                {isAdmin && (
                    <Button
                        variant="primary"
                        className="ms-2 d-flex align-items-center"
                        onClick={() => navigate('/projects/create')}
                        title="Add Project"
                    >
                        <FaPlus />
                    </Button>
                )}
            </Form>

            <Offcanvas className="offcanvas-background" style={{ width: 300 }} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex flex-column'>
                        <Card className='p-2 mb-3 border-0'>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Only finished projects"
                                onChange={handleFormCheckChange}
                                checked={isFinished}
                            />
                        </Card>
                        <Card className='p-2 mb-3 border-0'>
                            <Form.Select
                                className='border-0'
                                aria-label="Select Customer"
                                value={selectedCustomerId || ""}
                                onChange={handleCustomerSelectChange}
                            >
                                <option value="">Select a customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Card>
                        <Card className='p-2 mb-3 border-0'>
                            <Form.Select
                                className='border-0'
                                aria-label="Select Project Type"
                                value={selectedProjectTypeId || ""}
                                onChange={handleProjectTypeSelectChange}
                            >
                                <option value="">Select a project type</option>
                                {projectTypes.map((projectType) => (
                                    <option key={projectType.id} value={projectType.id}>
                                        {projectType.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Card>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default SortingMenu;
