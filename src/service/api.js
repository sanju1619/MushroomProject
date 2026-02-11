


import axios from 'axios'
const apiBaseUrl = import.meta.env.VITE_API_ENDPOINT;
const apii = axios.create(
    {
        baseURL:apiBaseUrl
    }
)

export default apii;