import { useState } from 'react'
import PropTypes from 'prop-types'
import { useUserValue } from '../contexts/UserContext'
import {
  showError,
  useNotificationDispatch,
} from '../contexts/NotificationContext'
import { remove, update } from '../services/blog'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from 'react-bootstrap'
import { HandThumbsUpFill, TrashFill } from 'react-bootstrap-icons'

const Blog = ({ blog }) => {
  const user = useUserValue()
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)

  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        title: 'Liked blog: ' + getTitleAndAuthor(res),
        type: 'success',
      })
    },
    onError: (e) => {
      notificationDispatch(showError(e))
    },
  })

  const likeBlog = () => {
    const b = { ...blog }
    b.likes++
    const userId = b.user?.id
    if (userId) b.user = userId
    updateBlogMutation.mutate(b)
  }

  const removeBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      const title = 'Removed blog: ' + getTitleAndAuthor(blog)
      notificationDispatch({ title, type: 'info' })
    },
    onError: (e) => {
      notificationDispatch(showError(e))
    },
  })

  const removeBlog = () => {
    removeBlogMutation.mutate(blog.id)
  }

  const getTitleAndAuthor = (b) => b.title + (b.author ? ` by ${b.author}` : '')

  return (
    <div className='blog accordion-item'>
      <h2 className='accordion-header'>
        <button
          className={`title accordion-button ${show ? '' : 'collapsed'}`}
          type='button'
          onClick={toggleShow}
        >
          {blog?.title}
        </button>
      </h2>
      <div
        className={`accordion-collapse collapse ${show ? 'show' : ''}`}
        aria-hidden={!show}
      >
        <div className='accordion-body p-0'>
          <div className='accordion-content'>
            {blog?.author ? (
              <div className='author mb-2 text-muted h6'>{blog.author}</div>
            ) : null}
            {blog?.url ? (
              <div className='mb-3'>
                <a className='url text-break' href={blog.url}>
                  {blog.url}
                </a>
              </div>
            ) : null}
            {blog?.user?.name ? (
              <div className='text-secondary'>
                Creator: <span className='creator'>{blog.user.name}</span>
              </div>
            ) : null}
          </div>
          <div className='accordion-footer bg-light-subtle border-top d-flex justify-content-between'>
            {user?.id ? (
              <Button
                className='like-button'
                variant='success'
                title='Like'
                onClick={likeBlog}
              >
                <HandThumbsUpFill className='me-2' />
                <span className='likes'>{blog?.likes}</span>
              </Button>
            ) : (
              <div>
                <HandThumbsUpFill className='me-2' />
                <span className='likes'>{blog?.likes}</span>
              </div>
            )}
            {blog?.user?.id && blog.user.id === user?.id ? (
              <Button variant='danger' title='Remove' onClick={removeBlog}>
                <TrashFill />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
