import axios from 'axios'

const getAll = (baseUrl) => axios.get(baseUrl).then((res) => res.data)

const create = async (baseUrl, newObj) => {
  const res = await axios.post(baseUrl, newObj).catch(e => console.error(e))
  return res.data
}

export default { getAll, create }
