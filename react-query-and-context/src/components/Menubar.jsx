import { useUserDispatch, useUserValue } from '../contexts/UserContext'
import { setToken } from '../services/blog'
import { useNotificationDispatch } from '../contexts/NotificationContext'

import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BoxArrowRight } from 'react-bootstrap-icons'

const Menubar = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  const onLogout = () => {
    localStorage.removeItem('loggedUser')
    setToken('')
    userDispatch(null)
    notificationDispatch({ title: 'Logged out', type: 'info' })
  }

  return (
    <Navbar className='border border-top-0 rounded-bottom mb-3'>
      <Container>
        <Navbar.Brand href='/'>FSO</Navbar.Brand>
        <Nav className='me-auto'>
          {user ? (
            <span className='text-success'>Logged in: {user?.name}</span>
          ) : (
            <span className='text-danger'>Not logged in</span>
          )}
        </Nav>
        {user ? (
          <OverlayTrigger
            placement='left'
            overlay={<Tooltip id='tooltip'>Logout</Tooltip>}
          >
            <Button id='logout' variant='info' onClick={onLogout}>
              <BoxArrowRight />
            </Button>
          </OverlayTrigger>
        ) : null}
      </Container>
    </Navbar>
  )
}

export default Menubar
