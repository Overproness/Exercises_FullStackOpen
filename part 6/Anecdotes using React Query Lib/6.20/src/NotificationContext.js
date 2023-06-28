import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'UP_VOTE':
            return state = `You Up-Voted ${action.payload}`
        case 'LENGTH_ERR':
            return state = 'Length of Anecdote cannot be less than 5 characters. '
        case 'RESET':
            return state = ''
        case 'CREATION':
            return state = `Anecdote '${action.payload}' has been created. `
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
    const [notification, notificationdispatcher] = useReducer(notificationReducer, '')

    return(
        <NotificationContext.Provider value={[notification, notificationdispatcher]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext