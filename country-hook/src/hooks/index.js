import { useEffect, useState } from 'react'
import { getCountry } from '../services/countries'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return
    const fetchData = async () => {
      const data = await getCountry(name)
      setCountry({
        name: data.name.common,
        capital: data.capital,
        population: data.population,
        flag: data.flags.svg,
      })
    }

    fetchData().catch((e) => {
      if (e.response.data.error === 'not found') {
        setCountry({ notFound: true })
      }
    })
  }, [name])

  return country
}
