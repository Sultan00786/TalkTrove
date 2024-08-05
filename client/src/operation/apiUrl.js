const BASE = import.meta.env.VITE_BASE_SERVER;

export const userApiUrl = {
  NEW_USER_SIGN_UP: `${BASE}/user/new`,
  USER_LOGIN: `${BASE}/user/login`,
  USER_LOGOUT: `${BASE}/user/logout`,
  GET_USER: `${BASE}/user/myprofile`,
  SEARCH_USER: `${BASE}/user/search`,
  SEND_FRIEND_REQUEST: `${BASE}/user/sendRequest`,
  ACCEPT_FRINEDD_REQUEST: `${BASE}/user/accept-request`,
  NOTIFICATION: `${BASE}/user/notification`,
  GET_ALL_MY_FRIENDS: `${BASE}/user/getMyFriend`,
};

export const chatApiUrl = {
  CREAT_NEW_GROUP: `${BASE}/chat/newGroup`,
  GET_ALL_CHAT: `${BASE}/chat/getMyChats`,
};
