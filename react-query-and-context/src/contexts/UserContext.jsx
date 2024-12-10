import { createContext, useReducer, useContext } from 'react'
import { setToken } from '../services/blog'

const userReducer = (state, content) => {
  return content
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const getUser = () => {
    const loggedUser = localStorage.getItem('loggedUser')
    if (!loggedUser) return null

    const user = JSON.parse(loggedUser)
    setToken(user.token)
    return user
  }

  const [user, userDispatch] = useReducer(userReducer, getUser())

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export default UserContext
