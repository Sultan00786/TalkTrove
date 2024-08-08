import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, InputBase, Paper, Stack, TextField } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { orange } from "@mui/material/colors";
import { sampleMessage } from "../components/constant/sampleData";
import MessageBox from "../components/message/MessageBox";
import MessageAttachement from "../components/message/MessageAttachement";
import { useSelector } from "react-redux";

function Chat() {
  const messages = sampleMessage;
  const userId = "1";
  const [message, setMessage] = useState("");
  const { socket } = useSelector((state) => state.socket);

  return (
    <div className=" w-full h-full max-h-[95vh]">
      <div className=" bg-gray-300 h-[88%] px-5 py-3 rounded-sm overflow-y-auto overflow-x-hidden flex flex-col gap-5 shadow-sm shadow-gray-300 border-2 border-gray-400 border-t-0">
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
      <form className=" w-full h-fit flex items-center gap-2 ">
        <div className=" w-full h-fit flex items-center gap-4 px-3 pt-6  ">
          <div className="w-full h-[50%] bg-gray-300 rounded-full p-1 px-2 flex items-center shadow-sm shadow-neutral-900 ">
            <IconButton>
              <AttachFileIcon className=" text-gray-500 rotate-12" />
            </IconButton>
            <InputBase
              name="message"
              id="message"
              placeholder="Type your message"
              className=" w-full"
              onChange={(e) => setMessage(e.target.value)}
            ></InputBase>
          </div>
          <div
            onClick={() => {
              socket.emit("MESSAGE", message);
            }}
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
