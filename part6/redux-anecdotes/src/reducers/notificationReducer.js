import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: '',
  timeoutHandle: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return {
        ...state,
        message: action.payload,
      }
    },
    clearNotification(state) {
      // Make sure there are no dangling clier timeouts
      clearTimeout(state.timeoutHandle)
      return {
        message: '',
        timeoutHandle: null
      }
    },
    setTimeoutHandle(state, action) {
      // Make sure there are no dangling clier timeouts
      clearTimeout(state.timeoutHandle)
      return {
        ...state,
        timeoutHandle: action.payload,
      }
    }
  }
})

const { setMessage, setTimeoutHandle } = notificationSlice.actions
export const { clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout = 5) => {
  return async (dispatch) => {
    const timeoutHandle = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
    dispatch(setMessage(message))
    dispatch(setTimeoutHandle(timeoutHandle))
  }
}

export default notificationSlice.reducer
