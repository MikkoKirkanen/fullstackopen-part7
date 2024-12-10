import { Container } from 'react-bootstrap'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Menubar from './components/Menubar'
import BlogForm from './components/BlogForm'
import { useUserValue } from './contexts/UserContext'

function App() {
  const user = useUserValue()

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
