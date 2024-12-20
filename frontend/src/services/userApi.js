import { current } from "@reduxjs/toolkit";
import { $authHost, $host } from "./host";
import { jwtDecode } from 'jwt-decode';

class UserApi {
    async registration(firstname, lastname, email, password) {
        try {
            const { data } = await $host.post('api/auth/registration', {
                firstname,
                lastname,
                email,
                password
            });

            localStorage.setItem('delicious-token', data.token);

            return jwtDecode(data.token);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async login(email, password) {
        try {
            const { data } = await $host.post('api/auth/login', {
                email,
                password
            });

            localStorage.setItem('delicious-token', data.token);

            return jwtDecode(data.token);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async checkToken() {
        const token = localStorage.getItem('delicious-token');
        if (!token) {
            console.warn('No token found');
            return null;
        }

        try {
            const { data } = await $authHost.get('api/auth/auth');

            localStorage.setItem('delicious-token', data.token);

            return jwtDecode(data.token);
        } catch (e) {
            localStorage.setItem('delicious-token', "")
            console.error('Error checking token:', e);
            return null;
        }
    }

    async getAll() {
        try {
            const response = await $authHost.get(`/api/users/all`);

            return response.data;
        } catch (error) {
            console.log(error);
            this.handleError(error, 'An error occurred while fetching users.');
        }
    }

    async getAllUsers(page = 0, limit = 10) {
        try {
            const response = await $authHost.get(`/api/users`, {
                params: {
                    page,
                    limit
                }
            });

            return response.data;
        } catch (error) {
            console.log(error);
            this.handleError(error, 'An error occurred while fetching users.');
        }
    }

    async getRoles() {
        try {
            const response = await $authHost.get(`/api/roles`);

            return response.data;
        } catch (error) {
            console.log(error)

            this.handleError(error, 'An error occurred while fetching the user.');
        }
    }

    async getUserProfile() {
        try {
            const response = await $authHost.get(`/api/users/profile`);
            return response.data;
        } catch (error) {
            this.handleError(error, 'An error occurred while fetching the user.');
        }
    }

    async updateUserRole(userId, newRole) {
        try {
            console.log(userId)
            console.log(newRole)
            await $authHost.put(`/api/users/${userId}`, { role: newRole });
        } catch (error) {
            console.error('Failed to update user role', error);
            throw error;
        }
    }

    async changePassword(currentPass, newPass) {
        try {
            const response = await $authHost.put(`/api/auth/pass`, {
                currentPass,
                newPass
            });

            console.log(response);

            return { message: 'Password changed successfully' };
        } catch (error) {
            console.log(error);
            this.handleError(error, 'An error occurred while changing the password.');
        }
    }

    async uploadImage(imageData) {
        try {
            const response = await $authHost.patch('/api/users/upload', imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to upload image', error);
            this.handleError(error, 'An error occurred while uploading the image.');
        }
    }

    async deleteImage() {
        try {
            const response = await $authHost.delete('/api/users/upload');
            return response.data;
        } catch (error) {
            console.error('Failed to delete image', error);
            this.handleError(error, 'An error occurred while deleting the image.');
        }
    }

    handleError(error, defaultMessage) {
        if (error.response) {
            throw new Error(error.response.data.message || defaultMessage);
        } else if (error.request) {
            throw new Error('No response received from the server.');
        } else {
            throw new Error('Error: ' + error.message);
        }
    }
}

const userApi = new UserApi();
export default userApi;
