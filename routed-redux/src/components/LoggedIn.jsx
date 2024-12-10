import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BoxArrowRight } from 'react-bootstrap-icons'
import { userLogout } from '../reducers/userReducer'

const LoggedIn = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  return (
    <Nav>
      <Navbar.Text className='text-success me-3'>
        Logged in: {user?.name}
      </Navbar.Text>
      <OverlayTrigger
        placement='left'
        overlay={<Tooltip id='tooltip'>Logout</Tooltip>}
      >
        <Button
          id='logout'
          variant='danger'
          onClick={() => dispatch(userLogout())}
        >
          <BoxArrowRight />
        </Button>
      </OverlayTrigger>
    </Nav>
  )
}

export default LoggedIn
