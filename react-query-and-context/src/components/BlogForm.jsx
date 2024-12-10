import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../services/blog'
import {
  showError,
  useNotificationDispatch,
} from '../contexts/NotificationContext'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const empty = { title: '', author: '', url: '' }
  const [blog, setBlog] = useState(empty)
  const [showForm, setShowForm] = useState(false)

  const toggleShowForm = () => setShowForm(!showForm)

  const handleBlogChange = (e) => {
    const target = e.target
    setBlog((state) => ({
      ...state,
      [target.name]: target.value,
    }))
  }

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      const title =
        'New blog created: ' +
        res.title +
        (res.author ? ` by ${res.author}` : '')
      notificationDispatch({ title })
      setBlog(empty)
    },
    onError: (e) => {
      notificationDispatch(showError(e))
    },
  })

  const submit = (e) => {
    e.preventDefault()
    newBlogMutation.mutate(blog)
  }

  return (
    <>
      <Button
        id='create'
        className={'mb-3 ' + (showForm ? 'd-none' : '')}
        onClick={toggleShowForm}
      >
        Create a new blog
      </Button>
      <Card className={'mb-3 ' + (showForm ? '' : 'd-none')}>
        <Card.Header as='h1'>Create a new blog</Card.Header>
        <Card.Body>
          <Form onSubmit={submit}>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter title'
                value={blog.title}
                onChange={handleBlogChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='author'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                name='author'
                placeholder='Enter author'
                value={blog.author}
                onChange={handleBlogChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='url'>
              <Form.Label>Url</Form.Label>
              <Form.Control
                type='text'
                name='url'
                placeholder='Enter url'
                value={blog.url}
                onChange={handleBlogChange}
              />
            </Form.Group>
            <div className='d-flex justify-content-between'>
              <Button
                variant='secondary'
                type='button'
                onClick={toggleShowForm}
              >
                Cancel
              </Button>
              <Button id='send' variant='primary' type='submit'>
                Send
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default BlogForm
