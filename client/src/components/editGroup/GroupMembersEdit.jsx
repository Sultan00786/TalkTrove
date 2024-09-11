import { IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import AvatarCard from "../shared/AvatarCard";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { removeGrpMem } from "../../operation/apiController/chatApi";
import { useParams, useNavigate } from "react-router-dom";
import { setToggle } from "../../operation/reducer/userSlice";

const GroupMembersEdit = (user) => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const chatId = param.chatId;

  const { toggle } = useSelector((state) => state.user);

  const handlerRevomeMember = async () => {
    const data = await removeGrpMem(user.user._id, chatId, navigate);
    if (data) dispatch(setToggle(!toggle));
  };

  return (
    <div className=" px-7">
      <Paper sx={{ bgcolor: "#F3F4F6" }} elevation={4}>
        <div className=" flex items-center justify-between p-4 px-6">
          <div className=" flex items-center">
            <AvatarCard avatar={[user.user.avatar]} className />
            <Typography variant="h6">{user.user.name}</Typography>
          </div>
          <IconButton
            onClick={handlerRevomeMember}
            sx={{
              bgcolor: "red",
              ":hover": { bgcolor: "#c60b0b" },
            }}
          >
            <RemoveIcon className=" text-white" />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
};

export default GroupMembersEdit;
