import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

export const getAll = async () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

export const login = ({ username, password }) => {
    const request = axios.post(baseUrl + '/login', {
        username,
        password
    })
    return request.then(response => response.data)
}