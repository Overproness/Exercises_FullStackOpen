import axios from "axios";
const baseUrl = 'http://localhost:3001/persons/'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = newObj => {
    const request = axios.post(baseUrl, newObj)
    return request.then(response => response.data)
}

const del = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
}


export default {getAll, add, del}