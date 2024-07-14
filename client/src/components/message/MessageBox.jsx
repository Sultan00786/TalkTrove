import React from "react";

function MessageBox({ message, userId }) {
  //   console.log(message);
  const avatar =
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1085.jpg";
  return (
    <div
      className={` flex items-start gap-4  px-3 py-2 rounded-lg ${
        message.sender === userId
          ? "bg-gray-100 text-gray-950 self-end max-w-[55%]"
          : "bg-gray-950 text-gray-100 max-w-[59%]"
      }`}
    >
      {message.sender !== userId && (
        <div className="w-12 h-14">
          <img src={avatar} alt="" className=" rounded-full" />
        </div>
      )}
      {message.content}
    </div>
  );
}

export default MessageBox;
