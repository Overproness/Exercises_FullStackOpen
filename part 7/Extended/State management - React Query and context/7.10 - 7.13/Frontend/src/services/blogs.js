import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAll = () =>
  axios
    .get('/api/blogs')
    .then((res) => res.data)
    .catch((err) => err.message)

export const create = (newObject) => {
  const config = {
    headers: { authorization: token },
  }
  axios
    .post(baseUrl, newObject, config)
    .then((res) => res.data)
    .catch((err) => err.message)
}

export const update = async (newObject, id) => {
  axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((res) => res.data)
    .catch((err) => err.message)
}

export const remove = async (id) => {
  const config = {
    headers: { authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return { response, id }
}

export default { setToken }
