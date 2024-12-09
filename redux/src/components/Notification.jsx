import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { hide } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  return (
  <Alert
    id='notification'
    variant={notification?.type}
    show={!!notification?.show}
    dismissible
    className='notification fixed-top w-auto m-3'
    onClose={() => dispatch(hide())}
  >
    {notification?.title ? (
      <Alert.Heading>{notification.title}</Alert.Heading>
    ) : null}
    {notification?.messages?.length ? (
      <ul className='mb-0'>
        {notification.messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
    ) : null}
  </Alert>
)}

export default Notification
