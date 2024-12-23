import React, { useEffect, useState } from 'react';
import { Container, Spinner, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import userApi from '../../services/userApi';
import ProfileImage from './components/ProfileImage';
import ChangePasswordForm from './components/ChangePasswordForm';
import ImageModal from './components/ImageModal';
import ProfileDetails from './components/ProfileDetails';
import './styles/UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await userApi.getUserProfile();
                setUser(userData);
                if (userData.Image) {
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
            setImageFile(null);
            setShowImageModal(false);
        } catch (error) {
            toast.error('Failed to update profile image: ' + (error.message || 'An error occurred'));
        } finally {
            setImageFile(null);
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
            <div className="profile-card">
                <h2 className="text-center mb-4">User Profile</h2>
                <ProfileImage
                    image={image}
                    onEdit={() => setShowImageModal(true)}
                    onRemove={handleImageRemove}
                />
                <ProfileDetails user={user} />
                <h4 className="mt-4">
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => setShowChangePassword(!showChangePassword)}
                    >
                        {showChangePassword ? 'Cancel Change Password' : 'Change Password'}
                    </Button>
                </h4>

                {showChangePassword && <ChangePasswordForm />}

                <ImageModal
                    show={showImageModal}
                    onClose={() => {
                        setShowImageModal(false);
                        setImageFile(null);
                    }}
                    onUpload={handleImageUpload}
                    setImageFile={setImageFile}
                />
            </div>
        </Container>
    );
};

export default UserProfile;