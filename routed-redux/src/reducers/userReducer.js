import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import blogService from '../services/blog'
import { showNotification, showError } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set: (state, action) => action.payload,
    login(state, action) {
      return action.payload
    },
    logout() {
      return null
    },
  },
})

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(set(user))
      blogService.setToken(user.token)
    }
  }
}

export const userLogin = (credentials) => {
  return (dispatch) => {
    userService
      .login(credentials)
      .then((res) => {
        dispatch(login(res))
        localStorage.setItem('loggedUser', JSON.stringify(res))
        blogService.setToken(res.token)
        dispatch(showNotification({ ...res, type: 'success' }))
      })
      .catch((e) => {
        dispatch(showError(e))
      })
  }
}

export const userLogout = () => {
  return (dispatch) => {
    dispatch(logout())
    localStorage.removeItem('loggedUser')
    blogService.setToken('')
    dispatch(showNotification({ title: 'Logged out', type: 'info' }))
  }
}

export const { login, logout, set } = userSlice.actions
export default userSlice.reducer
