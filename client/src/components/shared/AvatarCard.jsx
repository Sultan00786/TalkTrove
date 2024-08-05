import React from "react";

function AvatarCard({ avatar }) {
  return (
    <div>
      <div className={`relative w-16 h-12`}>
        {avatar.map((data, index) => {
          const left = `left-[${index - 0.5}rem] z-[${avatar.length - index}] `;
          return (
            <div
              key={index}
              className={`absolute ${left} w-12 h-12 rounded-full border-[3px] border-gray-200 shadow-md `}
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
