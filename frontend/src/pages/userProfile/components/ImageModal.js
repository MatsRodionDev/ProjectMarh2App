import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ImageModal = ({ show, onClose, onUpload, setImageFile }) => (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Update Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="formImageUpload">
                <Form.Label>Choose Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    accept="image/*"
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={onUpload}>
                Upload
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ImageModal;
