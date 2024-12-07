import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

export const getCountry = (name) =>
  axios.get(baseUrl + name).then((res) => res.data)
