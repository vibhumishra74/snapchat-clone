import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import cameraReducer from "../features/cameraslice";

export default configureStore({
  reducer: {
    app: appReducer,
    camera: cameraReducer,
  },
});
