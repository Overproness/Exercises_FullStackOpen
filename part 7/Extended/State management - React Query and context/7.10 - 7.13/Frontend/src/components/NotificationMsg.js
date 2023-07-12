import { useNotificationValue } from '../notificationContext'
import { useStatusCodeValue } from '../statusCodeContext'

const NotificationMsg = () => {
  const notificationValue = useNotificationValue()
  const statusCodeValue = useStatusCodeValue()
  let notificationStyles
  if (statusCodeValue === 201 || statusCodeValue === 200) {
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

  if (notificationValue) {
    return (
      <div
        style={notificationStyles}
        className="notificationMsg"
        id="notificationMsg"
      >
        <p>{notificationValue}</p>
      </div>
    )
  }
}

export default NotificationMsg
