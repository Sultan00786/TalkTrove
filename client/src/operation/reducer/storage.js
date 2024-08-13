import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import socketReducer from "./socketSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
  },
});

export default store;
