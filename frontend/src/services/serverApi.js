import axios from 'axios'

class ServerApi {
    BASE_URL = 'http://localhost:7000'

    api = axios.create({
        baseURL: this.BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    async checkToken() {
        const token = localStorage.getItem('delicious-token')

        if(!token) return null

        try {
            const response = await this.api.get('/api/auth/auth', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return response.data
        } catch(e) {
            return null
        }
    }
}

const serverApi = new ServerApi()
export default serverApi;