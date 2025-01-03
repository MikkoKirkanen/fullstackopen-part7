import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { userLogin } from '../reducers/userReducer'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
  const dispatch = useDispatch()
  const [login, setLogin] = useState({ username: '', password: '' })

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
  }

  return (
    <div className='login-container'>
      <Card className='login-content mb-3'>
        <Card.Header as='h1'>Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
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
            <div className='d-flex justify-content-end'>
              <Button id='login' variant='primary' type='submit'>
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login
