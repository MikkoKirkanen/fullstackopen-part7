import './style.scss'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    blogs: blogReducer,
    users: usersReducer,
  },
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
