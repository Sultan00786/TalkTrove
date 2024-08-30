import { Grow, Slide } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AvatarCard from "./AvatarCard";
import { NEW_MESSAGE_ALERT } from "../../constant/events";
import { useSocketEvents } from "../../hooks/hooks";
import { useSelector } from "react-redux";

function ChatItem({
  avatar,
  name,
  _id,
  groupChat = false,
  isChatOpen,
  isOnline,
  index = 0,
  handleDeleteChat,
  setPerticularChatI,
}) {
  const navigate = useNavigate();
  const { socket } = useSelector((state) => state.socket);
  const [show, setShow] = useState(false);

  const { chatId } = useParams();
  const [newMessageAlert, setNewMessageAlert] = useState(0);

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

  const handlerNewMessageAlert = useCallback((data) => {
    if (_id === data.chatId) {
      // console.log("new message alert", data);
      // console.log("params", chatId);
      if (_id !== chatId) {
        setNewMessageAlert(newMessageAlert + 1);
      } else setNewMessageAlert(0);
    }
  });
  const eventArrNewMsgAlert = { [NEW_MESSAGE_ALERT]: handlerNewMessageAlert };
  useSocketEvents(socket, eventArrNewMsgAlert);

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
            {newMessageAlert !== 0 && (
              <div className=" w-5 h-5 absolute z-50 right-4 text-white font-semibol flex items-center justify-center bg-emerald-600 rounded-full shadow-sm shadow-black ">
                {newMessageAlert}
              </div>
            )}
          </div>
        </div>
      </Link>
    </Grow>
  );
}

export default ChatItem;
