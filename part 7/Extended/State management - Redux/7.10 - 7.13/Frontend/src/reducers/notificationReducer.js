import { createSlice } from '@reduxjs/toolkit'
import { setErrorCode } from './errorReducer'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return (state = action.payload)
    },
  },
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (text, time, code) => {
  return (dispatch) => {
    dispatch(createNotification(`${text}`))
    setTimeout(() => {
      dispatch(createNotification(null))
    }, time * 1000)
    dispatch(setErrorCode(code, time))
  }
}

export default notificationSlice.reducer
