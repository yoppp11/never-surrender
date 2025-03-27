import axios from 'axios'

const http = axios.create({
    baseURL: 'https://yofi.yop-gans.web.id'
})

export default http