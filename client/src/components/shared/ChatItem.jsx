import { Grow, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AvatarCard from "./AvatarCard";

function ChatItem({
  avatar,
  name,
  _id,
  groupChat = false,
  isChatOpen,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
  setPerticularChatI,
}) {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handlerClickOnFriendChat = () => {
    console.log("clicked");
    setPerticularChatI(_id);
    navigate(`/chat/${_id}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, index * 80); // Delay before the transition starts

    return () => clearTimeout(timer);
  }, []);

  return (
    <Grow style={{ width: `100%` }} in={show} timeout={250}>
      <Link
        className="w-full"
        to={`/chat/${_id}`}
        onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      >
        <div
          className={`relativeS flex gap-3 px-3 py-3 cursor-pointer  ${
            isChatOpen
              ? " bg-black text-white hover:bg-gray-900"
              : "hover:bg-gray-300"
          }`}
          onClick={handlerClickOnFriendChat}
        >
          <AvatarCard avatar={avatar} />
          <div className="flex items-center justify-between">
            <div className="font-semibold text-lg pl-2">{name}</div>
            {newMessageAlert && (
              <div className=" text-xs font-semibold pr-2">
                {newMessageAlert?.count} New Message
              </div>
            )}
          </div>
          {isOnline && (
            <div className="absolute right-2 top-0 h-full flex items-center ">
              <div className="w-2 h-2 rounded-full bg-green-700"></div>
            </div>
          )}
        </div>
      </Link>
    </Grow>
  );
}

export default ChatItem;
