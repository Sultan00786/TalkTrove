import { createSlice } from "@reduxjs/toolkit";
const talkTrove = JSON.parse(localStorage.getItem("talkTrove")) || {};
const initialState = {
  user: talkTrove.user ? talkTrove.user : null,
  token: talkTrove.token ? talkTrove.token : null,
  userFriends: [],
  loading: false,
  toggle: false,
  newMessageArr: talkTrove.newMessageArr ? talkTrove.newMessageArr : [],
  NOTIFICATION: talkTrove.NOTIFICATION ? talkTrove.NOTIFICATION : false,
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
    setUserFriend: (state, action) => {
      state.userFriends = action.payload;
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
  setUserFriend,
  setNOTIFICATION,
  setNewMessageArr,
} = userSlice.actions;
export default userSlice.reducer;
