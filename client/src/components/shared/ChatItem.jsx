import { Grow, Slide } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AvatarCard from "./AvatarCard";
import { NEW_MESSAGE_ALERT } from "../../constant/events";
import { useSocketEvents } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNewMessageArr } from "../../operation/reducer/userSlice";

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
  const dispatch = useDispatch();

  const { socket } = useSelector((state) => state.socket);
  const { newMessageArr } = useSelector((state) => state.user);

  const [show, setShow] = useState(false);

  const { chatId } = useParams();
  const [newMessageAlert, setNewMessageAlert] = useState(0);

  const handlerClickOnFriendChat = () => {
    setPerticularChatI(_id);
    navigate(`/chat/${_id}`);

    let newArr = newMessageArr.filter((item) => item.chatId !== _id);
    dispatch(setNewMessageArr(newArr));
    localStorage.setItem("newMessageArr", JSON.stringify(newArr));
    setNewMessageAlert(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, index * 80); // Delay before the transition starts

    const temp = newMessageArr?.filter((i) => i.chatId === _id)[0];
    console.log(temp);
    if (temp?.chatId === _id) {
      setNewMessageAlert(temp.count);
      console.log("hellow");
    }

    return () => clearTimeout(timer);
  }, []);

  // new message alert event handling by using socket
  const handlerNewMessageAlert = useCallback((data) => {
    if (_id === data.chatId) {
      // if this chat not open and url/params mai chatId nhi hie then
      if (_id !== chatId) {
        // setNewMessageAlert(newMessageAlert + 1);
        let arr1 = [];
        let arr2 = [];

        // pushing value in both arr on bases of some condition given bellow
        for (let i = 0; i < newMessageArr.length; i++) {
          // if chatId equal
          if (newMessageArr[i]?.chatId === _id) arr1.push(newMessageArr[i]);
          // if not equal
          else if (newMessageArr[i]?.chatId !== _id)
            arr2.push(newMessageArr[i]);
        }

        // if arr1 ki length zero then new object bana lege
        if (arr1.length === 0) arr1.push({ chatId: _id, count: 1 });
        // if length zero nahi hie then count increment karege
        else {
          console.log("hellow");
          console.log(arr1);
          arr1 = [{ chatId: _id, count: arr1[0].count + 1 }];
        }

        const newArr = [...arr2, ...arr1];
        console.log(newArr);

        // state handling
        setNewMessageAlert(arr1[0].count);
        dispatch(setNewMessageArr(newArr));

        // set newMessageArr in local storage
        localStorage.setItem("newMessageArr", JSON.stringify(newArr));
      }
      // else if equal chat is opened then
      else {
        setNewMessageAlert(0);
      }
    }
  });
  const eventArrNewMsgAlert = { [NEW_MESSAGE_ALERT]: handlerNewMessageAlert };
  // this function is used useEffect hook for calling socket event
  useSocketEvents(socket, eventArrNewMsgAlert);

  // console.log(newMessageArr);

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
