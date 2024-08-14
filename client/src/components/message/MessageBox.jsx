import React from "react";

function MessageBox({ message, userId }) {
  //   console.log(message);
  const isEqualUser = message.sender._id === userId;
  const avatar = message?.sender?.avatar?.url;
  return (
    <div
      className={` flex items-start gap-4  px-3 py-2 rounded-lg ${
        isEqualUser
          ? "bg-gray-100 text-gray-950 self-end max-w-[55%]"
          : "bg-gray-950 text-gray-100 w-fit max-w-[59%]"
      }`}
    >
      {!isEqualUser && (
        <div>
          <img src={avatar} alt="" className=" w-[35px] rounded-full" />
        </div>
      )}
      <p className=" w-fit">{message.content}</p>
    </div>
  );
}

export default MessageBox;
