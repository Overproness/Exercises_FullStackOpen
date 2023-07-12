/* eslint-disable indent */
import { createContext, useContext, useReducer } from 'react'

const statusCodeReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      return action.payload
    }
    case 'RESET': {
      return (state = null)
    }
    default: {
      return state
    }
  }
}

const StatusCodeContext = createContext()

export const StatusCodeContextProvider = (props) => {
  const [statusCode, statusCodeDispatcher] = useReducer(statusCodeReducer, null)
  return (
    <StatusCodeContext.Provider value={[statusCode, statusCodeDispatcher]}>
      {props.children}
    </StatusCodeContext.Provider>
  )
}

export const useStatusCodeValue = () => {
  const statusCodeAndDispatch = useContext(StatusCodeContext)
  return statusCodeAndDispatch[0]
}

export const useStatusCodeDispatcher = () => {
  const statusCodeAndDispatch = useContext(StatusCodeContext)
  return statusCodeAndDispatch[1]
}

export default StatusCodeContext
