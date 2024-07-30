import { json } from "react-router-dom";
import { apiConnector } from "../apiConnect";
import { userApiUrl } from "../apiUrl";
import toast from "react-hot-toast";
import { setToken, setUser } from "../reducer/userSlice";

const { NEW_USER_SIGN_UP, USER_LOGIN, USER_LOGOUT } = userApiUrl;

export const newUser = (data) => {
  try {
    console.log(data);
    const response = apiConnector("POST", NEW_USER_SIGN_UP, data);
    console.log(response);
    if (!response) throw new Error(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUser = async (data, dispatch, navigate) => {
  const toastId = toast.loading("Logging...");
  try {
    if (!data) throw new Error("Required data for login");
    const response = await apiConnector("POST", USER_LOGIN, data);
    if (!response) throw new Error(response);

    dispatch(setUser(response?.data?.userData));
    dispatch(setToken(response?.data?.token));

    localStorage.setItem("user", JSON.stringify(response.data.userData));
    localStorage.setItem("token", JSON.stringify(response.data.token));

    toast.dismiss(toastId);
    toast.success("Logged in successfully");

    navigate("/");
  } catch (error) {
    toast.dismiss(toastId);
    console.log(error);
    toast.error("Something went wrong while Logging");
  }
};

export const userLogout = async (token, dispatch, navigate) => {
  try {
    const response = await apiConnector("POST", USER_LOGOUT);
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.clear();
    console.log(response);
    navigate("/");
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Something went wrong while Logging out");
    console.log(error);
  }
};
