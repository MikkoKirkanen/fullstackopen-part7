import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BoxArrowRight } from 'react-bootstrap-icons'
import { userLogout } from '../reducers/userReducer'

const Menubar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  return (
    <Navbar className='border border-top-0 rounded-bottom mb-3'>
      <Container>
        <Navbar.Brand href='#home'>FSO</Navbar.Brand>
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
            <Button id='logout' variant='info' onClick={() => dispatch(userLogout())}>
              <BoxArrowRight />
            </Button>
          </OverlayTrigger>
        ) : null}
      </Container>
    </Navbar>
  )
}

export default Menubar
