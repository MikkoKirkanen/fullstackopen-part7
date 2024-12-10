import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  showError,
  useNotificationDispatch,
} from '../contexts/NotificationContext'
import { useUserDispatch } from '../contexts/UserContext'
import { userLogin } from '../services/login'
import { setToken } from '../services/blog'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()
  const [login, setLogin] = useState({ username: '', password: '' })

  const handleLoginChange = (event) => {
    const target = event.target
    setLogin((state) => ({
      ...state,
      [target.name]: target.value,
    }))
  }

  const loginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (res) => {
      userDispatch(res)
      localStorage.setItem('loggedUser', JSON.stringify(res))
      setToken(res.token)
      notificationDispatch({ title: res.title, type: 'success' })
    },
    onError: (e) => {
      notificationDispatch(showError(e))
    },
  })

  const handleLogin = (e) => {
    e.preventDefault()
    loginMutation.mutate(login)
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
