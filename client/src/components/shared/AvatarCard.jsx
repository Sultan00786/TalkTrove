import React from "react";

function AvatarCard({ avatar, isOnline }) {
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
                className="w-fit h-fit rounded-full aspect-square object-cover"
              />
              {index === avatar.length - 1 && isOnline && (
                <div className=" relative z-40 flex items-center ">
                  <div className=" absolute -top-[2.8rem] right-0 w-[0.6rem] h-[0.6rem] rounded-full bg-green-600 border-[2px] border-green-700"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AvatarCard;
