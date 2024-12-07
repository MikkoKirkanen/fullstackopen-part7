import { useState } from 'react'

export const useField = () => {
  const [value, setValue] = useState('')
  const type = 'text'
  const onChange = (e) => {
    setValue(e?.target?.value || '')
  }

  return {
    type,
    value,
    onChange,
  }
}
