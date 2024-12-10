import { useSelector } from 'react-redux'
import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoggedOut from './LoggedOut'
import LoggedIn from './LoggedIn'

const Menubar = () => {
  const user = useSelector((state) => state.user)

  const getLoginStatus = () => {
    return user ? <LoggedIn /> : <LoggedOut />
  }

  return (
    <Navbar className='border border-top-0 rounded-bottom mb-3'>
      <Container>
        <Navbar.Brand href='#home'>FSO</Navbar.Brand>
        <Navbar.Toggle aria-controls='menubar' />
        <Navbar.Collapse id='menubar' className='justify-content-between'>
          <Nav>
            <Nav.Link as={Link} to='/'>
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to='/users'>
              Users
            </Nav.Link>
          </Nav>
          {getLoginStatus()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menubar
