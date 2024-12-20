import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaTrashAlt, FaEdit } from 'react-icons/fa';
import userApi from '../../services/userApi';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await userApi.getUserProfile(); 
                setUser(userData);
                if(userData.Image){
                    setImage(`http://localhost:7000/uploads/images/${userData.Image.fileName}`);
                }
            } catch (error) {
                toast.error('Failed to load user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const validatePassword = (password) => {
        const minLength = 8;

        if (password.length < minLength) {
            return 'Password must be at least 8 characters long.';
        }
        return '';
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordError(''); // Сброс ошибки

        const error = validatePassword(newPassword);
        if (error) {
            setPasswordError(error);
            return;
        }

        try {
            await userApi.changePassword(currentPassword, newPassword);
            toast.success('Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setShowChangePassword(false);
        } catch (error) {
            toast.error('Failed to change password: ' + (error.message || 'An error occurred'));
        }
    };

    const handleImageUpload = async () => {
        if (!imageFile) {
            toast.error('Please select an image file.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await userApi.uploadImage(formData);
            setImage(response.imageUrl);
            toast.success('Profile image updated successfully!');
            setImageFile(null); // Очистка состояния
            setShowImageModal(false);
        } catch (error) {
            toast.error('Failed to update profile image: ' + (error.message || 'An error occurred'));
        } finally {
            setImageFile(null); // Очистка состояния при любом результате
        }
    };

    const handleImageRemove = async () => {
        try {
            await userApi.deleteImage();
            setImage(null);
            toast.success('Profile image removed successfully!');
        } catch (error) {
            toast.error('Failed to remove profile image: ' + (error.message || 'An error occurred'));
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" variant="primary" />
                <p>Loading user profile...</p>
            </Container>
        );
    }

    if (!user) {
        return <div>Failed to load user data.</div>;
    }

    return (
        <Container className="d-flex justify-content-center mt-4">
            <div style={styles.card}>
                <h2 className="text-center mb-4">User Profile</h2>
                <div className="text-center mb-4">
                    {image ? (
                        <img
                            src={image}
                            alt="User Profile"
                            style={styles.profileImage}
                        />
                    ) : (
                        <div style={styles.placeholderImage}>No Image</div>
                    )}
                    <div className="d-flex justify-content-center gap-2 mt-2">
                        <Button
                            variant="light"
                            size="sm"
                            onClick={() => setShowImageModal(true)}
                            title="Change Image"
                        >
                            <FaEdit />
                        </Button>
                        {image && (
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={handleImageRemove}
                                title="Remove Image"
                            >
                                <FaTrashAlt />
                            </Button>
                        )}
                    </div>
                </div>

                <Form className="profile-form" style={styles.profileForm}>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={user.firstName} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={user.lastName} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={user.email} readOnly />
                    </Form.Group>
                </Form>

                <h4 className="mt-4">
                    <Button
                        variant="link"
                        size="sm"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowChangePassword(!showChangePassword);
                        }}
                    >
                        {showChangePassword ? 'Cancel Change Password' : 'Change Password'}
                    </Button>
                </h4>

                {showChangePassword && (
                    <Form onSubmit={handleChangePassword} className="mt-3 change-password-form" style={styles.changePasswordForm}>
                        <Form.Group controlId="formCurrentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {passwordError && (
                            <Alert variant="danger" style={{ marginTop: '10px' }}>
                                {passwordError}
                            </Alert>
                        )}
                        <Button variant="primary" type="submit" className="mt-3">
                            Change Password
                        </Button>
                    </Form>
                )}

                <Modal show={showImageModal} onHide={() => {
                    setShowImageModal(false);
                    setImageFile(null); // Очистка состояния при закрытии
                }}>
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
                        <Button variant="secondary" onClick={() => {
                            setShowImageModal(false);
                            setImageFile(null); // Очистка состояния при закрытии
                        }}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleImageUpload}>
                            Upload
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    );
};

// Встроенные стили
const styles = {
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '400px',
    },
    profileForm: {
        marginBottom: '20px',
    },
    changePasswordForm: {
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    profileImage: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        objectFit: 'cover',
        margin: '0 auto', // Центрирование изображения
    },
    placeholderImage: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        color: '#666',
        margin: '0 auto', 
    },
    iconButtonsContainer: {
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        display: 'flex',
        gap: '5px',
        position: 'absolute',
    },
};

export default UserProfile;
