import { useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';


const SortingMenu = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <Form className="d-flex mb-5">
                <Form.Control
                    type="search"
                    placeholder="Search Project"
                    className="me-2"
                    aria-label="Search"
                />
                <Button onClick={handleShow} className='me-2'>Filters</Button>
                <Button variant="outline-success" >Search</Button>
            </Form>

            <Offcanvas className="offcanvas-background" style={{width: 300}} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex flex-column'>
                        <Card className='p-2 mb-3 border-0'>
                            <h5>Category</h5>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                        </Card>
                        <Card className='p-2 mb-3 border-0'>
                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                                label="Check this switch"
                            />
                        </Card>
                        <Card className='p-2 mb-3 border-0 '>
                            <Form.Select className='border-0 ' aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Card>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
};

export default SortingMenu;