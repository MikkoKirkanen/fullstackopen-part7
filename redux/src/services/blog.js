import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL + 'blogs'
let headers = null

const setToken = (token) => {
  headers = { headers: {"Authorization" : `Bearer ${token}`} }
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newBlog) => {
  const res = await axios.post(baseUrl, newBlog, headers)
  return res.data
};

const update = async (blog) => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, headers)
  return res.data
}

const remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, headers)
  return res.data
}

export default { setToken, getAll, create, update, remove }
