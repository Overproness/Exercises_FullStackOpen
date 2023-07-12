/* eslint-disable indent */
import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'Like': {
      return (state = `You liked the blog '${action.payload}'`)
    }
    case 'RESET': {
      return (state = null)
    }
    case 'CREATION': {
      return (state = `The blog '${action.payload}' was successfully created. `)
    }
    case 'ERR': {
      return (state = action.payload)
    }
    case 'DELETION': {
      return (state = action.payload)
    }
    default: {
      return state
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatcher] = useReducer(
    notificationReducer,
    null
  )

  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatcher]}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatcher = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
