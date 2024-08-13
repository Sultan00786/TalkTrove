import { Check, Clear } from "@mui/icons-material";
import { Dialog, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { acceptFriendRequest } from "../../operation/apiController/userApi";
import { useNavigate } from "react-router-dom";

function NotificationDialog({ handleNotification, open, notificatnReq }) {
  console.log(notificatnReq);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRequestAccept = async (requestId, accept) => {
    dispatch(
      acceptFriendRequest(
        {
          requestId: requestId,
          accept: accept,
        },
        navigate
      )
    );
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
            {notificatnReq.map((notification) => (
              <div className="flex items-center justify-between">
                <div className=" flex items-center gap-3">
                  <img
                    src={notification.sender.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full border-[1px] shadow-sm border-gray-200 "
                  />{" "}
                  <p>{notification.sender.name}</p>
                </div>
                <div className=" flex items-center gap-3">
                  <div
                    onClick={() => {
                      console.log("green");
                      handleRequestAccept(notification._id, true);
                    }}
                    className=" bg-green-500 w-fit rounded-full hover:bg-green-600 "
                  >
                    <IconButton className=" w-7 h-7 flex items-center justify-center ">
                      <Check fontSize="small" className=" text-white" />
                    </IconButton>
                  </div>
                  <div
                    onClick={() => {
                      console.log("red");
                      handleRequestAccept(notification._id, false);
                    }}
                    className=" bg-red-500 w-fit rounded-full hover:bg-red-600 "
                  >
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
