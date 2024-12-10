import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Container } from 'react-bootstrap'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Menubar from './components/Menubar'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  return (
    <Router>
      <Container className='pb-3'>
        <Menubar />
        <Notification />
        <Routes>
          <Route path='/' element={<Blogs />}></Route>
          <Route path='/blogs/:id' element={<Blog />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/users/:id' element={<User />}></Route>
        </Routes>
      </Container>
    </Router>
  )
}

export default App
