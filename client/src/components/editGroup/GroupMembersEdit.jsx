import { IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import AvatarCard from "../shared/AvatarCard";
import RemoveIcon from "@mui/icons-material/Remove";

const GroupMembersEdit = (user) => {
  const data = user.user;
  return (
    <div className=" px-7">
      <Paper sx={{ bgcolor: "#F3F4F6" }} elevation={4}>
        <div className=" flex items-center justify-between p-4 px-6">
          <div className=" flex items-center">
            <AvatarCard avatar={data.avatar} className />
            <Typography variant="h6">{data.name}</Typography>
          </div>
          <IconButton
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
