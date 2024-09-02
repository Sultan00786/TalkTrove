import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getChatDetails,
  getGroupChat,
} from "../../operation/apiController/chatApi";
import AvatarCard from "../shared/AvatarCard";

function GroupChatEditList() {
  const pram = useParams();
  const navigate = useNavigate();

  const chatId = pram.chatId;

  const [groupChat, setGroupChat] = useState([]);

  useEffect(() => {
    const fetchGroupChat = async () => {
      const data = await getGroupChat(navigate);
      setGroupChat(data);
    };
    fetchGroupChat();
  }, []);

  return (
    <div className=" h-full flex flex-col bg-lime-200">
      {/* <div className=" mt-2"></div> */}
      {groupChat.map((chat, index) => (
        <div
          key={index}
          className={`  flex items-center gap-3 px-3 py-3 cursor-pointer  ${
            chatId === chat._id ? "bg-gray-950 text-white" : "hover:bg-lime-300"
          } `}
          onClick={(event) => {
            event.preventDefault();
            navigate(`/groups/group-edit/${chat._id}`);
          }}
        >
          <AvatarCard avatar={chat.avatar} />
          <div className="font-semibold">{chat.name}</div>
        </div>
      ))}
    </div>
  );
}

export default GroupChatEditList;
