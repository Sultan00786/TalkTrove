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
          className={`relative flex gap-3 px-3 py-3 cursor-pointer  ${
            isChatOpen
              ? " bg-black text-white hover:bg-gray-900"
              : "hover:bg-gray-300"
          }`}
          onClick={handlerClickOnFriendChat}
        >
          <AvatarCard avatar={avatar} isOnline={isOnline} />
          <div className="flex items-center justify-between">
            <div className=" w-[94%] font-extrabold text-lg pl-2">
              {name.length > 17 ? `${name.slice(0, 17)}...` : name}
            </div>
            {newMessageAlert && (
              <div className=" w-5 h-5 absolute z-50 right-4 text-white font-semibol flex items-center justify-center bg-emerald-600 border-[3px] border-green-700 rounded-full ">
                {newMessageAlert?.count}
              </div>
            )}
          </div>
        </div>
      </Link>
    </Grow>
  );
}

export default ChatItem;
