import React, { useEffect, useState } from "react";
import { SiMaildotru } from "react-icons/si";
import Face6Icon from "@mui/icons-material/Face6";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { calculateTimeSpam } from "../../lib/CalculateTimeSpam";
import { sampleUser } from "../constant/sampleData";
import { getUser } from "../../operation/apiController/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../operation/reducer/userSlice";

const Profile = ({ user }) => {
  const joinDate = new Date(user.createdAt);
  const userJoin = calculateTimeSpam(joinDate);

  return (
    <div className="flex flex-col items-center gap-6 h-full pt-6">
      <div>
        <img
          src={user.avatar[0]}
          className=" w-[200px] h-[200px] object-cover rounded-full border-[4px] border-gray-100 "
        />
      </div>

      <div className="flex flex-col items-center">
        <p>{user?.bio}</p>
        <p className="text-sm text-gray-500">Bio</p>
      </div>

      <div className="flex items-center gap-3">
        <SiMaildotru />
        <div className="flex flex-col items-center">
          <p>{user?.username}</p>
          <p className="text-sm text-gray-500">Username</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Face6Icon />
        <div className="flex flex-col items-center">
          <p>{user?.name}</p>
          <p className="text-sm text-gray-500">Name</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <CalendarMonthIcon />
        <div className="flex flex-col items-center">
          <p>{userJoin}</p>
          <p className="text-sm text-gray-500">Joined</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
