import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const usersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    set: (state, action) => action.payload,
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(set(users))
  }
}

export const { set } = usersSlice.actions
export default usersSlice.reducer
