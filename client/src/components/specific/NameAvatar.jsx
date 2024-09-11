import React from "react";

function NameAvatar({ avatar, name }) {
  return (
    <div className=" flex items-center gap-3">
      <img
        src={avatar}
        alt=""
        className="w-10 h-10 rounded-full border-[1px] shadow-sm border-gray-200 object-cover aspect-square"
      />{" "}
      <p>{name}</p>
    </div>
  );
}

export default NameAvatar;
