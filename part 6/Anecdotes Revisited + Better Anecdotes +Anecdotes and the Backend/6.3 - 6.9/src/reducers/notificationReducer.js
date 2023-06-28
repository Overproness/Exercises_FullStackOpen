import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        createNotification(state, action){
            return (state = action.payload)
        }
    }
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
    return dispatch => {
        dispatch(createNotification(text))
        setTimeout(() => { 
            dispatch(createNotification(''))
        }, time *1000)
    }
}

export default notificationSlice.reducer