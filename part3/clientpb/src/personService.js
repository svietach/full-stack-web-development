import axios from 'axios'

const baseUrl = '/api/persons';

export const getAll = async () => {
    return await axios.get(baseUrl);
}

export const create = async (newObject) => {
    return await axios.post(baseUrl, newObject);
}

export const deletePerson = async (id) => {
    try {
        await axios.delete(`${baseUrl}/${id}`).catch(err => {
            if (err.response.status === 404) {
                throw new Error(`${err.config.url} not found`);
            }
            throw err;
        });;
        return true;
    } catch (e) {
        return false;
    }
}

export const updatePerson = async (person) => {
    await axios.put(`${baseUrl}/${person.id}`, person);
}