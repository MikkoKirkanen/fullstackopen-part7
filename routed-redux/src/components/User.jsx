import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import ListGroup from 'react-bootstrap/ListGroup'

const User = () => {
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const user = users?.find((u) => u.id === id)
  const userBlogs = blogs.filter((b) => b.user?.id === id)
  const navigate = useNavigate()

  const onNavigate = (id) => {
    navigate(`/blogs/${id}`)
  }

  const getBlogs = () => {
    if (!userBlogs?.length) {
      return <div className='text-danger'>User don't have any blogs</div>
    }
    return userBlogs.map((b) => (
      <ListGroup.Item key={b.id} action onClick={() => onNavigate(b.id)}>
        {b.title}
      </ListGroup.Item>
    ))
  }

  return (
    <div>
      <h1>{user?.name}</h1>
      <h2>Blogs</h2>
      <ListGroup>{getBlogs()}</ListGroup>
    </div>
  )
}

export default User
