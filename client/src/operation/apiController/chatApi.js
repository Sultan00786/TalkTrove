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

export const getChatDetails = async (chatId, navigate) => {
  try {
    const response = await apiConnector("GET", `${GET_CHAT_DETAILS}/${chatId}`);
    console.log(response);
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
