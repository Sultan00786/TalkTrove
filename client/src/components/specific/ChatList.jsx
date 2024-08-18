import { colors, Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";

function ChatList({
  w = "100",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
  setPerticularChatI,
}) {
  return (
    <div className="flex flex-col items-center overflow-y-scroll h-full w-full">
      {chats.map((data, index) => {
        const { name, isGroupChat, avatar, members, _id } = data;
        const newMessageAlert = newMessagesAlert.find((i) => i.chatId === _id);
        const isOnline = members?.some((memberId) =>
          onlineUsers.includes(memberId)
        );

        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={isGroupChat}
            isChatOpen={chatId === _id}
            handleDeleteChat={handleDeleteChat}
            setPerticularChatI={setPerticularChatI}
          />
        );
      })}
    </div>
  );
}

export default ChatList;
