import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { HandThumbsUpFill, TrashFill } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)

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
            )}
            {blog?.user?.id && blog.user.id === user?.id ? (
              <Button
                variant='danger'
                title='Remove'
                onClick={() => dispatch(removeBlog(blog))}
              >
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
