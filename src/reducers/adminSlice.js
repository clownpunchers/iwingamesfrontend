// adminSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedItem: "dashboard",
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.selectedItem = action.payload
    }
  },
});

export const { setPage } = adminSlice.actions;
export default adminSlice.reducer;