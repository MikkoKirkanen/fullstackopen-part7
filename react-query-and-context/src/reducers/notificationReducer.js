import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    show(state, action) {
      return {
        ...action.payload,
        show: true,
      }
    },
    hide(state) {
      return {
        ...state,
        show: false,
      }
    },
  },
})

export const showNotification = (content) => {
  return (dispatch) => {
    if (timeoutId) clearTimeout(timeoutId)

    dispatch(show(content))

    timeoutId = setTimeout(() => dispatch(hide()), 5000)
  }
}

export const showError = (error) => {
  return (dispatch) => {
    const data =
      error.message === 'Network Error'
        ? { title: error.message }
        : error.response.data
    dispatch(
      showNotification({
        type: 'danger',
        ...data,
      })
    )
  }
}

export const { show, hide } = notificationSlice.actions
export default notificationSlice.reducer
