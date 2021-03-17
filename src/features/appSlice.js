import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    selectimage: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    selectimage: (state, action) => {
      state.selectimage = action.payload;
    },
    resetimage: (state) => {
      state.selectimage = null;
    },
  },
});

export const { login, logout, selectimage, resetimage } = appSlice.actions;

export const selectuser = (state) => state.app.user;
export const selectselectedimage = (state) => state.app.selectimage;

export default appSlice.reducer;
