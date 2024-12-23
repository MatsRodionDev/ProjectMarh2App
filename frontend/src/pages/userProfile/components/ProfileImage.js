import React from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ProfileImage = ({ image, onEdit, onRemove }) => (
    <div className="text-center mb-4">
        {image ? (
            <img src={image} alt="User Profile" className="profile-image" />
        ) : (
            <div className="placeholder-image">No Image</div>
        )}
        <div className="d-flex justify-content-center gap-2 mt-2">
            <Button variant="light" size="sm" onClick={onEdit} title="Change Image">
                <FaEdit />
            </Button>
            {image && (
                <Button variant="danger" size="sm" onClick={onRemove} title="Remove Image">
                    <FaTrashAlt />
                </Button>
            )}
        </div>
    </div>
);

export default ProfileImage;
