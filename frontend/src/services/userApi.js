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
        const token = localStorage.getItem('delicious-token'); // Или откуда вы храните токен
        if (!token) {
            console.warn('No token found');
            return null;
        }

        try {
            const { data } = await $authHost.get('api/auth/auth');

            localStorage.setItem('delicious-token', data.token);

            return jwtDecode(data.token);
        } catch (e) {
            console.error('Error checking token:', e);
            return null;
        }
    }

    async getAllUsers() {
        try {
            const response = await $authHost.get('/api/users');

            return response.data;
        } catch (error) {
            console.log(error);
            this.handleError(error, 'An error occurred while fetching users.');
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

    async changePassword(currentPass, newPass) {
        try {
            var response = await $authHost.put(`/api/auth/pass`, {
                currentPass,
                newPass
            });

            console.log(response)

            return { message: 'Password changed successfully' };
        } catch (error) {
            console.log(error)
            this.handleError(error, 'An error occurred while changing the password.');
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