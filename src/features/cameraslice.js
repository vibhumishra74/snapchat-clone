import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    cameraimage: null,
  },
  reducers: {
    setcameraimage: (state, action) => {
      state.cameraimage = action.payload;
    },
    resetcameraimage: (state) => {
      state.cameraimage = null;
    },
  },
});

export const { setcameraimage, resetcameraimage } = cameraSlice.actions;

export const selectcamera = (state) => state.camera.cameraimage;

export default cameraSlice.reducer;
