import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL + 'login'

export const userLogin = async (loginObj) => {
  const res = await axios.post(baseUrl, loginObj)
  return res.data
}

export default { userLogin }
