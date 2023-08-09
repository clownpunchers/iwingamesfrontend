// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authenticated = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.authenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
