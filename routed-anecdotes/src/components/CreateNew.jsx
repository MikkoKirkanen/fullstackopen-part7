
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import PropTypes from 'prop-types'

const CreateNew = (props) => {
  const content = useField()
  const author = useField()
  const info = useField()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.onChange()
    author.onChange()
    info.onChange()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...content} />
        </div>
        <div>
          Author
          <input {...author} />
        </div>
        <div>
          Url for more info
          <input {...info} />
        </div>
        <button>Create</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

CreateNew.propTypes = {
  addNew: PropTypes.func,
}

export default CreateNew
