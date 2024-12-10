import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { userLogin } from '../reducers/userReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { BoxArrowInRight } from 'react-bootstrap-icons'
import { Navbar, Modal, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'

const LoggedOut = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const emptyLogin = { username: '', password: '' }
  const [login, setLogin] = useState(emptyLogin)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleLoginChange = (event) => {
    const target = event.target
    setLogin((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(userLogin(login))
    setLogin(emptyLogin)
  }

  return (
    <Nav>
      <Navbar.Text className='text-danger me-3'>Not logged in</Navbar.Text>
      <OverlayTrigger
        placement='left'
        overlay={<Tooltip id='tooltip'>Login</Tooltip>}
      >
        <Button id='login' variant='success' onClick={handleShow}>
          <BoxArrowInRight />
        </Button>
      </OverlayTrigger>

      <Modal show={show} size='sm' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title as='h1'>Login</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleLogin}>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                placeholder='Enter username'
                value={login.username}
                onChange={handleLoginChange}
              />
              <div className='text-secondary'>username: aku</div>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Enter password'
                value={login.password}
                onChange={handleLoginChange}
              />
              <div className='text-secondary'>password: ankkalinna</div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className='justify-content-between'>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleLogin}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Nav>
  )
}

export default LoggedOut
