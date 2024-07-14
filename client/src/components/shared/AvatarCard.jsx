import React from "react";

function AvatarCard({ avatar }) {
  return (
    <div>
      <div className="relative w-16 h-10">
        {avatar.map((data, index) => {
          const left = `left-[${index - 0.5}rem] z-[${avatar.length - index}] `;
          return (
            <div
              className={`absolute ${left} w-10 h-10 rounded-full border-[3px] border-gray-200 shadow-md `}
            >
              <img
                key={index}
                src={data}
                alt="avatar"
                className="w-fit h-fit rounded-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AvatarCard;
