import {  $authHost ,$host } from "./host"
import {jwtDecode} from 'jwt-decode'

class UserApi {
    async registration(firstname, lastname, email, password) {
        try {
            const {data} = await $host.post('api/auth/registration', {
                firstname,
                lastname,
                email,
                password
            })

            localStorage.setItem('delicious-token', data.token)
    
            return jwtDecode(data.token)
        } catch(e) {
            console.log(e)
            return null
        }
    }

    async login(email, password) {
        try {
            const {data} = await $host.post('api/auth/login', {
                email,
                password
            })

            localStorage.setItem('delicious-token', data.token)
    
            return jwtDecode(data.token)
        } catch(e) {
            console.log(e)
            return null
        }
    }

    async checkToken() {
        // const token = localStorage.getItem('token'); // Или откуда вы храните токен
        // // if (!token) {
        // //     console.warn('No token found');
        // //     return null;
        // // }

        try {
            const response = await $authHost.get('api/auth/auth');
            return response.data;
        } catch (e) {
            console.error('Error checking token:', e);
            return null;
        }
    }
}

const userApi = new UserApi()
export default userApi;