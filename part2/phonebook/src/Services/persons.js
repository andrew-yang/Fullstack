import axios from 'axios'
const baseUrl = '/api/persons'

const getAllEntries = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const createEntry = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const updateEntry = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}
  
export default { getAllEntries, createEntry, updateEntry, deleteEntry }