import { useEffect, useState } from 'react'
import apiService from '../services/api'

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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [url, setUrl] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setUrl(baseUrl)
      const data = await apiService.getAll(baseUrl)
      setResources(data)
    }

    fetchData().catch(e => {
      console.error(e)
    })
  }, [])

  const create = async (resource) => {
    const data = await apiService.create(url, resource)
    setResources(resources.concat(data))
  }

  const service = {
    create,
  }

  return [resources, service]
}
