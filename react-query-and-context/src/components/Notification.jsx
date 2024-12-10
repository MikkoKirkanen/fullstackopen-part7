import Alert from 'react-bootstrap/Alert'
import {
  useNotificationDispatch,
  useNotificationValue,
} from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()

  return (
    <Alert
      id='notification'
      variant={notification?.type}
      show={notification?.show || false}
      dismissible
      className='notification fixed-top w-auto m-3'
      onClose={() => notificationDispatch()}
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
  )
}

export default Notification
