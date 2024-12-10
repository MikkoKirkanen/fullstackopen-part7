import { useSelector } from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate } from 'react-router'
import BlogForm from './BlogForm'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const onNavigate = (id) => {
    navigate(`/blogs/${id}`)
  }

  const getNewBlogForm = () => {
    if (!user) return null
    return <BlogForm />
  }

  return (
    <div>
      <h1>Blogs</h1>
      {getNewBlogForm()}
      <ListGroup>
        {blogs?.map((b) => (
          <ListGroup.Item key={b.id} action onClick={() => onNavigate(b.id)}>
            {b.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blogs
