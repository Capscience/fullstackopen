import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;
