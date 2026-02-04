import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  isError: false,
  timeoutHandle: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      return {
        ...state,
        message: action.payload,
      };
    },
    setIsError(state, action) {
      return {
        ...state,
        isError: action.payload,
      };
    },
    clearNotification(state) {
      clearTimeout(state.timeoutHandle);
      return {
        message: "",
        timeoutHandle: null,
      };
    },
    setTimeoutHandle(state, action) {
      clearTimeout(state.timeoutHandle);
      return {
        ...state,
        timeoutHandle: action.payload,
      };
    },
  },
});

const { setMessage, setIsError, setTimeoutHandle } = notificationSlice.actions;
export const { clearNotification } = notificationSlice.actions;

const setNotification = (message, timeout, isError) => {
  return async (dispatch) => {
    const timeoutHandle = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
    dispatch(setMessage(message));
    dispatch(setIsError(isError));
    dispatch(setTimeoutHandle(timeoutHandle));
  };
};

export const setInfo = (message, timeout = 5) => {
  return async (dispatch) => {
    dispatch(setNotification(message, timeout, false));
  };
};

export const setError = (message, timeout = 5) => {
  return async (dispatch) => {
    dispatch(setNotification(message, timeout, true));
  };
};

export default notificationSlice.reducer;
