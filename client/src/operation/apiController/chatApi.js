import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnect";
import { chatApiUrl } from "../apiUrl";

const { GET_ALL_CHAT, GET_CHAT_DETAILS } = chatApiUrl;

export const getAllUserChats = async (data) => {
  try {
    const response = await apiConnector("GET", GET_ALL_CHAT);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getChatDetails = async (chatId) => {
  try {
    const response = await apiConnector("GET", `${GET_CHAT_DETAILS}/${chatId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
