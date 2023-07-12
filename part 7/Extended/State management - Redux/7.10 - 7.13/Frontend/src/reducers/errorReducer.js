import { createSlice } from '@reduxjs/toolkit'

const errorCodeSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    initError(state, action) {
      return action.payload
    },
  },
})

export const { initError } = errorCodeSlice.actions

export const setErrorCode = (errorCode, time) => {
  return (dispatch) => {
    dispatch(initError(errorCode))
    setTimeout(() => {
      dispatch(initError(null))
    }, time * 1000)
  }
}

export default errorCodeSlice.reducer
