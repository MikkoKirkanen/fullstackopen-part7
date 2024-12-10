import { useParams } from 'react-router'
import { useState } from 'react'

import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { HandThumbsUpFill, TrashFill } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { ListGroup } from 'react-bootstrap'

const Blog = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs?.find((b) => b.id === id)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const getCreator = () => {
    if (!blog?.user?.name) return null
    return (
      <Card.Text className='text-secondary'>
        Creator: {blog.user.name}
      </Card.Text>
    )
  }

  const getLikes = () => {
    return user?.id ? (
      <Button
        className='like-button'
        variant='success'
        title='Like'
        onClick={() => dispatch(likeBlog(blog))}
      >
        <HandThumbsUpFill className='me-2' />
        <span className='likes'>{blog?.likes}</span>
      </Button>
    ) : (
      <div>
        <HandThumbsUpFill className='me-2' />
        <span className='likes'>{blog?.likes}</span>
      </div>
    )
  }

  const onRemove = () => {
    dispatch(removeBlog(blog))
  }

  const getRemoveButton = () => {
    if (!user?.id || blog?.user?.id !== user?.id) return null
    return (
      <Button variant='danger' title='Remove' onClick={onRemove}>
        <TrashFill />
      </Button>
    )
  }

  const getCommentForm = () => {
    if (!user) return null
    return (
      <Form onSubmit={handleCommentSubmit}>
        <Form.Group className='mb-3' controlId='comment'>
          <InputGroup>
            <Form.Control
              type='text'
              name='commment'
              placeholder='Enter comment'
              value={comment}
              onChange={handleCommentChange}
            />
            <Button type='submit'>Add comment</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    )
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }
  const handleCommentSubmit = (e) => {
    e.preventDefault()
    dispatch(addComment(blog.id, { comment }))
    setComment('')
  }

  const getComments = () => {
    if (!blog.comments?.length) {
      return (
        <div className='text-warning'>There are no comments on this blog.</div>
      )
    }
    return (
      <ListGroup>
        {blog.comments?.map((c, i) => (
          <ListGroup.Item key={i} variant="dark">{c}</ListGroup.Item>
        ))}
      </ListGroup>
    )
  }

  if (!blog) {
    return <div className='text-danger'>No blog to display</div>
  }

  return (
    <div>
      <Card className='mb-3'>
        <Card.Header as='h1'>{blog?.title}</Card.Header>
        <Card.Body>
          <Card.Title>{blog?.author}</Card.Title>
          <Card.Link>{blog?.url}</Card.Link>
          {getCreator()}
        </Card.Body>
        <Card.Footer className='d-flex justify-content-between'>
          {getLikes()}
          {getRemoveButton()}
        </Card.Footer>
      </Card>
      <h4>Comments</h4>
      {getCommentForm()}
      {getComments()}
    </div>
  )
}

export default Blog
