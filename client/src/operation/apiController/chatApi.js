import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnect";
import { chatApiUrl } from "../apiUrl";

const { GET_ALL_CHAT, GET_CHAT_DETAILS, GET_MESSAGES } = chatApiUrl;

export const getAllUserChats = async (data) => {
  try {
    const response = await apiConnector("GET", GET_ALL_CHAT);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getChatDetails = async (chatId, navigate) => {
  try {
    const response = await apiConnector("GET", `${GET_CHAT_DETAILS}/${chatId}`);
    return response.data.data;
  } catch (error) {
    console.error(error.response.status);
    if (error.response.status === 400) {
      console.log("Chat not found");
      navigate("/notFound");
      toast.error("Chat not found");
    }
    return error;
  }
};

export const getOldMessages = async (chatId, page) => {
  try {
    const response = await apiConnector(
      "GET",
      GET_MESSAGES + `/${chatId}?page=${page}`,
      null,
      { page: page }
    );
    if (!response) throw new Error("Failed to fetch messages");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
