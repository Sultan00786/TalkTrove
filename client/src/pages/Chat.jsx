import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputBase } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sampleMessage } from "../components/constant/sampleData";
import AppLayout from "../components/layout/AppLayout";
import MessageAttachement from "../components/message/MessageAttachement";
import MessageBox from "../components/message/MessageBox";
import { NEW_MESSAGE } from "../constant/events";
import { useSocketEvents } from "../hooks/hooks";
import { getOldMessages } from "../operation/apiController/chatApi";
import { setLoading } from "../operation/reducer/userSlice";

function Chat({ chatId, members }) {
  // const messages = sampleMessage;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const { socket } = useSelector((state) => state.socket);

  const scrollRef = useRef();
  const scrollElement = scrollRef.current;

  const handleSendMessage = (e) => {
    if (!message.trim()) return;
    // Emmiting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
    e.preventDefault();
  };

  const handlerNewMessage = useCallback((data) => {
    setMessages((prev) => [...prev, data.data]);
  }, []);

  const eventArr = { [NEW_MESSAGE]: handlerNewMessage }; // object is created with [dynamic key value]
  useSocketEvents(socket, eventArr);

  useEffect(() => {
    const fetchOldMessages = async () => {
      const result = await getOldMessages(chatId, page);
      if (result.messages) {
        console.log(result.messages);
        let newArr = [...oldMessages, ...result.messages];
        console.log(newArr);
        setOldMessages(newArr);
        console.log(oldMessages);
      }
      if (result.totalPages) {
        setTotalPages(result.totalPages);
      }
      console.log(page < totalPages);
      if (page <= totalPages) {
        scrollElement.scrollTop = 999;
      }
    };
    fetchOldMessages();
  }, [page]);

  useEffect(() => {
    // Implement infinite scroll logic here
    if (scrollElement) {
      // if statement is used because undifine's error is occure
      scrollElement.addEventListener("scroll", () => {
        if (page < totalPages && scrollElement.scrollTop === 0) {
          setPage(page + 1);
        }
      });

      return () => scrollElement.removeEventListener("scroll", () => {});
    }
  }, [totalPages]);

  return (
    <div className=" w-full h-full max-h-[95vh]">
      <div
        ref={scrollRef}
        className=" bg-gray-300 h-[88%] px-5 py-3 rounded-sm overflow-y-auto overflow-x-hidden flex flex-col gap-5 shadow-sm shadow-gray-300 border-2 border-gray-400 border-t-0"
      >
        {/* map for old messages  */}
        {oldMessages.map((message, index) => (
          <>
            {message?.attachment?.length !== 0 ? (
              <MessageAttachement />
            ) : (
              <MessageBox
                userId={userId}
                message={message}
                key={index}
                index={index}
              />
            )}
          </>
        ))}

        {/* map for real time messages */}
        {messages.map((message, index) => (
          <>
            {message?.attachment?.length !== 0 ? (
              <MessageAttachement />
            ) : (
              <MessageBox userId={userId} message={message} key={index} />
            )}
          </>
        ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        className=" w-full h-fit flex items-center gap-2 "
      >
        <div className=" w-full h-fit flex items-center gap-4 px-3 pt-6  ">
          <div className="w-full h-[50%] bg-gray-300 rounded-full p-1 px-2 flex items-center shadow-sm shadow-neutral-900 ">
            <IconButton>
              <AttachFileIcon className=" text-gray-500 rotate-12" />
            </IconButton>
            <InputBase
              name="message"
              id="message"
              value={message}
              placeholder="Type your message"
              className=" w-full"
              onChange={(e) => setMessage(e.target.value)}
            ></InputBase>
          </div>
          <div
            onClick={handleSendMessage}
            className=" bg-rose-400 hover:bg-rose-500 w-fit h-fit  rounded-full p-2 shadow-sm shadow-neutral-900"
          >
            <SendIcon className=" text-gray-50 -rotate-45 " />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AppLayout()(Chat);
