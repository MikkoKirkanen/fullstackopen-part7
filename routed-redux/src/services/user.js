import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

const login = async (loginObj) => {
  const res = await axios.post(baseUrl + 'login', loginObj)
  return res.data
}

const getAll =  async() => {
  const res = await axios.get(baseUrl + 'users')
  return res.data
}

export default { login, getAll }
