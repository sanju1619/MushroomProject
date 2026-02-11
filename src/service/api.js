


import axios from 'axios'

const apii = axios.create(
    {
        baseURL:'http://192.168.31.8:8000/api/'
    }
)

export default apii;