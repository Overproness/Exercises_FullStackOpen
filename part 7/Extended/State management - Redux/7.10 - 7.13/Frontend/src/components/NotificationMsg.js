import { useSelector } from 'react-redux'

const NotificationMsg = () => {
  const errorCode = useSelector((state) => state.errorCode)
  const message = useSelector((state) => state.notification)
  let notificationStyles
  if (errorCode === 201 || errorCode === 200) {
    notificationStyles = {
      color: 'green',
      borderColor: 'green',
    }
  } else {
    notificationStyles = {
      color: 'red',
      borderColor: 'red',
    }
  }

  if (message) {
    return (
      <div
        style={notificationStyles}
        className="notificationMsg"
        id="notificationMsg"
      >
        <p>{message}</p>
      </div>
    )
  }
}

export default NotificationMsg
