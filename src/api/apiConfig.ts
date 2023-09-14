import axios from 'axios'

const httpRequest = axios.create({
    baseURL: 'https://picsum.photos',
})

export default httpRequest;