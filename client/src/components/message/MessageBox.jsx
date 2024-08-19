import React, { useEffect, useState } from "react";
import { Slide } from "@mui/material";

function MessageBox({ message, userId, index = 0 }) {
  const isEqualUser = message.sender._id === userId;
  const avatar = message?.sender?.avatar?.url;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, index * 70);
    return () => clearTimeout(timer);
  });

  return (
    <Slide in={show} direction={"right"} timeout={200}>
      <div
        className={` flex items-start gap-4  px-3 py-2 rounded-lg ${
          isEqualUser
            ? "bg-gray-100 text-gray-950 self-end max-w-[55%]"
            : "bg-gray-950 text-gray-100 w-fit max-w-[59%]"
        }`}
      >
        {!isEqualUser && (
          <div>
            <img
              src={avatar}
              alt=""
              className=" w-[35px] rounded-full aspect-square object-cover"
            />
          </div>
        )}
        <p className=" w-fit whitespace-normal break-all">{message.content}</p>
      </div>
    </Slide>
  );
}

export default MessageBox;
