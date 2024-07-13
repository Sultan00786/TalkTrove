import { Add, Search } from "@mui/icons-material";
import {
  Dialog,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleChats } from "../constant/sampleData";
import { Check, Clear } from "@mui/icons-material";

function NotificationDialog({ handleNotification, open }) {
  const users = sampleChats;

  const handler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div>
      <Dialog onClick={handleNotification} open={open}>
        <div
          onClick={handler}
          className=" lg:min-w-[400px] lg:min-h-96 flex flex-col gap-5 items-center p-4 "
        >
          <Typography variant="h6">Notification</Typography>
          <div className=" w-full px-16 pt-3 flex flex-col gap-4">
            {users.map((user) => (
              <div className="flex items-center justify-between">
                <div className=" flex items-center gap-3">
                  <img
                    src={user.avatar[0]}
                    alt=""
                    className="w-8 h-8 rounded-full border-[1px] shadow-sm border-gray-200 "
                  />{" "}
                  <p>{user.name}</p>
                </div>
                <div className=" flex items-center gap-3">
                  <div className=" bg-green-500 w-fit rounded-full hover:bg-green-600 ">
                    <IconButton className=" w-7 h-7 flex items-center justify-center ">
                      <Check fontSize="small" className=" text-white" />
                    </IconButton>
                  </div>
                  <div className=" bg-red-500 w-fit rounded-full hover:bg-red-600 ">
                    <IconButton className=" w-7 h-7 flex items-center justify-center ">
                      <Clear fontSize="small" className=" text-white" />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default NotificationDialog;
