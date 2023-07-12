import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const NotificationMsg = () => {
  const errorCode = useSelector((state) => state.errorCode)
  const message = useSelector((state) => state.notification)
  let notificationStyles
  if (errorCode === 201 || errorCode === 200) {
    notificationStyles = 'success'
  } else {
    notificationStyles = 'error'
  }

  if (message) {
    return (
      <div id="notificationMsg">
        <Alert severity={notificationStyles}>{message}</Alert>
      </div>
    )
  }
}

export default NotificationMsg
