import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

export const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export const submitBlog = ({ title, author, url }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const request = axios.post(baseUrl, {
        title,
        author,
        url
    }, {
        headers: { Authorization: `Bearer ${user.token}` }
    })
    return request.then(response => response.data)
}

export const updateBlog = ({ id, title, author, url, likes }) => {
    const request = axios.put(baseUrl + '/' + id, {
        title,
        author,
        url,
        likes,
    });
    return request.then(response => response.data)
}

export const deleteBlog = ({ id }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const request = axios.delete(baseUrl + '/' + id, {
        headers: { Authorization: `Bearer ${user.token}` }
    });
    return request.then(response => response.data).catch((err) => console.log(err))
}


