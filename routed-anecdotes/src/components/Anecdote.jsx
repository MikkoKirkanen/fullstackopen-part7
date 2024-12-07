import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const Anecdote = ({ anecdotes }) => {
  const id = Number(useParams().id)
  const anecdote = anecdotes.find((a) => a.id === id)

  const author = () => {
    return anecdote.author ? <span> by {anecdote.author}</span> : null
  }

  return (
    <div>
      <h2>
        {anecdote.content}
        {author()}
      </h2>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

Anecdote.propTypes = {
  anecdotes: PropTypes.array,
}

export default Anecdote
