import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { Container } from 'react-bootstrap'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Menubar from './components/Menubar'
import BlogForm from './components/BlogForm'

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [])

  return (
    <Container className='pb-3'>
      <Menubar />
      <Notification />
      {user ? (
        <BlogForm />
      ) : (
        <Login />
      )}
      <h1>Blogs</h1>
      <Blogs />
    </Container>
  )
}

export default App
