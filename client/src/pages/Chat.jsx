import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputBase } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { sampleMessage } from "../components/constant/sampleData";
import AppLayout from "../components/layout/AppLayout";
import MessageAttachement from "../components/message/MessageAttachement";
import MessageBox from "../components/message/MessageBox";
import { NEW_MESSAGE } from "../constant/events";
import { useSocketEvents } from "../hooks/hooks";
import { getOldMessages } from "../operation/apiController/chatApi";

function Chat({ chatId, members }) {
  // const messages = sampleMessage;
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);
  const { socket } = useSelector((state) => state.socket);

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

  const fetchOldMessages = async () => {
    const result = await getOldMessages(chatId);
    if (result.messages) setOldMessages(result.messages);
    console.log("result", result);
  };

  useEffect(() => {
    fetchOldMessages();
  }, []);

  return (
    <div className=" w-full h-full max-h-[95vh]">
      <div className=" bg-gray-300 h-[88%] px-5 py-3 rounded-sm overflow-y-auto overflow-x-hidden flex flex-col gap-5 shadow-sm shadow-gray-300 border-2 border-gray-400 border-t-0">
        {/* map for old messages  */}
        {oldMessages.map((message, index) => (
          <>
            {message?.attachment?.length !== 0 ? (
              <MessageAttachement />
            ) : (
              <MessageBox userId={userId} message={message} key={index} />
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
