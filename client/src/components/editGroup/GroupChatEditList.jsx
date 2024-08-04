import React, { useState } from "react";
import { sampleGroupChat } from "../constant/sampleData";
import AvatarCard from "../shared/AvatarCard";
import { Link, useParams } from "react-router-dom";
import AddMemberDialog from "./AddMemberDialog";
import DeleteGroup from "./DeleteGroup";

function GroupChatEditList() {
  const pram = useParams();
  const chatId = pram.chatId;
  const groupChat = sampleGroupChat;
  
  return (
    <div className=" h-full flex flex-col bg-lime-200">
      {/* <div className=" mt-2"></div> */}
      {groupChat.map((chat, index) => (
        <Link
          to={`/groups/group-edit/${chat._id}`}
          key={index}
          className={`  flex items-center gap-3 px-3 py-3 cursor-pointer  ${
            chatId === chat._id ? "bg-gray-950 text-white" : "hover:bg-lime-300"
          } `}
        >
          <AvatarCard avatar={chat.avatar} />
          <div className="font-semibold">{chat.name}</div>
        </Link>
      ))}
      
    </div>
  );
}

export default GroupChatEditList;
