import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  loading: false,
  toggle: false,
  newMessageArr: localStorage.getItem("newMessageArr")
    ? JSON.parse(localStorage.getItem("newMessageArr"))
    : [],
  NOTIFICATION: localStorage.getItem("NOTIFICATION") ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    setNewMessageArr: (state, action) => {
      state.newMessageArr = action.payload;
    },
    setNOTIFICATION: (state, action) => {
      state.NOTIFICATION = action.payload;
    },
  },
});

export const {
  setUser,
  setLoading,
  setToggle,
  setToken,
  setNOTIFICATION,
  setNewMessageArr,
} = userSlice.actions;
export default userSlice.reducer;
