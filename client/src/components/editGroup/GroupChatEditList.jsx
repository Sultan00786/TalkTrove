import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGroupChat } from "../../operation/apiController/chatApi";
import AvatarCard from "../shared/AvatarCard";
import { useDispatch } from "react-redux";
import { setToggle } from "../../operation/reducer/userSlice";
import { useSelector } from "react-redux";

function GroupChatEditList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pram = useParams();
  const chatId = pram.chatId;

  const [groupChat, setGroupChat] = useState([]);

  const { toggle } = useSelector((state) => state.user);

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
        <Link
          to={`/groups/group-edit/${chat._id}`}
          key={index}
          className={`  flex items-center gap-3 px-3 py-3 cursor-pointer  ${
            chatId === chat._id ? "bg-gray-950 text-white" : "hover:bg-lime-300"
          } `}
          onClick={() => dispatch(setToggle(!toggle))}
        >
          <AvatarCard avatar={chat.avatar} />
          <div className="font-semibold">{chat.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default GroupChatEditList;
