import PropTypes from 'prop-types'

const Notification = ({notification}) => {
  if (!notification) return

  return (
    <div>
      {notification}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string,
}

export default Notification