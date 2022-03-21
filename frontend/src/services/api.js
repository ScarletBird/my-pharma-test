import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-pharma-test-gff.herokuapp.com/',
})

export default api;