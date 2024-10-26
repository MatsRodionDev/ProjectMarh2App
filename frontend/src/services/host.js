import axios from 'axios'

const BASE_URL = 'http://localhost:7000'

const $host = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

const $authHost = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('delicious-token') ?? ''}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,  
    $authHost
}