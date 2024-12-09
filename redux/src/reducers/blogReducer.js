import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blog'
import { showNotification, showError } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const blog = action.payload
      return sort(state.map((a) => (a.id !== blog.id ? a : blog)))
    },
    remove: (state, action) => state.filter((b) => b.id !== action.payload.id),
    set: (state, action) => sort(action.payload),
  },
})

const sort = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const getTitleAndAuthor = (blog) => {
  return blog.title + (blog.author ? ` by ${blog.author}` : '')
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}

export const createBlog = (content) => {
  return (dispatch) => {
    blogService
      .create(content)
      .then((res) => {
        dispatch(create(res))
        let title = 'A new blog added: ' + getTitleAndAuthor(res)
        dispatch(showNotification({ title, type: 'success' }))
      })
      .catch((e) => {
        dispatch(showError(e))
      })
  }
}

export const likeBlog = (blog) => {
  return (dispatch) => {
    blog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const userId = blog.user?.id
    if (userId) {
      blog.user = userId
    }
    blogService
      .update(blog)
      .then((res) => {
        dispatch(like(res))
        const title = 'Liked blog: ' + getTitleAndAuthor(res)
        dispatch(showNotification({ title: title, type: 'success' }))
      })
      .catch((e) => {
        dispatch(showError(e))
      })
  }
}

export const removeBlog = (blog) => {
  return (dispatch) => {
    const message = 'Removed blog: ' + getTitleAndAuthor(blog)
    if (confirm(message)) {
      blogService
        .remove(blog.id)
        .then((res) => {
          dispatch(remove(blog))
          dispatch(showNotification({ ...res, type: 'info' }))
        })
        .catch((e) => {
          dispatch(showError(e))
        })
    }
  }
}

export const { create, like, set, remove } = blogSlice.actions
export default blogSlice.reducer
