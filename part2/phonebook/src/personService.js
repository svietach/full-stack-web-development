import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

export const getAll = async () => {
    return await axios.get(baseUrl);
}

export const create = async (newObject) => {
    return await axios.post(baseUrl, newObject);
}

export const deletePerson = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
}

export const updatePerson = async (person) => {
    await axios.put(`${baseUrl}/${person.id}`, person);
}