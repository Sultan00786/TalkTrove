import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnect";
import { chatApiUrl } from "../apiUrl";

const {
  GET_ALL_CHAT,
  GET_CHAT_DETAILS,
  GET_MESSAGES,
  GET_GROUP_CHAT_LIST,
  CREAT_NEW_GROUP,
  ADD_GROUP_MEMEBERS,
  DELETE_GROUP,
  REMOVE_GROUP_MEMBER,
  RENAME_GROUP,
} = chatApiUrl;

export const getAllUserChats = async (data) => {
  try {
    const response = await apiConnector("GET", GET_ALL_CHAT);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getChatDetails = async (chatId, navigate, populate) => {
  try {
    const response = await apiConnector(
      "GET",
      `${GET_CHAT_DETAILS}/${chatId}?populate=${populate}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error.response.status);
    if (error.response.status === 400) {
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

export const getGroupChat = async (navigate) => {
  try {
    const response = await apiConnector("GET", GET_GROUP_CHAT_LIST, null);
    if (!response.data.data) throw new Error("Failed to fetch group chat");
    return response.data.data;
  } catch (error) {
    console.error(error);
    navigate("/notFound");
    return [];
  }
};

export const removeGrpMem = async (userId, chatId, navigate) => {
  try {
    const response = await apiConnector("PUT", REMOVE_GROUP_MEMBER, {
      userId: userId,
      chatId: chatId,
    });
    if (response.data.message) toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.data.message) toast.error(error.response.data.message);
    else navigate("/notFound");
    return null;
  }
};

export const renameGroup = async (groupName, chatId, navigate) => {
  try {
    const response = await apiConnector("PUT", RENAME_GROUP + `/${chatId}`, {
      name: groupName,
    });
    if (response.data.message) toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.data.message) toast.error(error.response.data.message);
    return null;
  }
};

export const newGroupChat = async (data) => {
  try {
    const response = await apiConnector("POST", CREAT_NEW_GROUP, data);
    if (response.data.message) toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.data.message) toast.error(error.response.data.message);
    return null;
  }
};

export const addNewMembers = async (chatId, members) => {
  try {
    const response = await apiConnector("PUT", ADD_GROUP_MEMEBERS, {
      members: members,
      chatId: chatId,
    });
    console.log(response.data);
    if (response.data.message) toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.data.message) toast.error(error.response.data.message);
    return null;
  }
};

export const deleteGroup = async (chatId, navigate) => {
  try {
    const response = await apiConnector("DELETE", DELETE_GROUP + `/${chatId}`);
    if (response.data.message) {
      toast.success(response.data.message);
      navigate("/groups");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.data.message) toast.error(error.response.data.message);
    return null;
  }
};
