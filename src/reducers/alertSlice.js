// alertSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: {}
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload
    }
  },
});

export const { setInfo } = alertSlice.actions;
export default alertSlice.reducer;