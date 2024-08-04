const BASE = import.meta.env.VITE_BASE_SERVER;

export const userApiUrl = {
  NEW_USER_SIGN_UP: `${BASE}/user/new`,
  USER_LOGIN: `${BASE}/user/login`,
  USER_LOGOUT: `${BASE}/user/logout`,
  GET_USER: `${BASE}/user/myprofile`,
};
