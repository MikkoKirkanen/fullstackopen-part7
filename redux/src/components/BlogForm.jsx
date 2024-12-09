import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })
  const [showForm, setShowForm] = useState(false)

  const toggleShowForm = () => setShowForm(!showForm)

  const handleBlogChange = (event) => {
    const target = event.target
    setBlog((blog) => ({
      ...blog,
      [target.name]: target.value,
    }))
  }

  const clearBlogForm = () => {
    setBlog({ title: '', author: '', url: '' })
  }

  const submit = (event) => {
    event.preventDefault()
    dispatch(createBlog(blog))
    clearBlogForm()
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
