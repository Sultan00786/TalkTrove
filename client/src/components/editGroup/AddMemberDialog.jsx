import React from "react";
import { sampleGroupMember } from "../constant/sampleData";
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import NameAvatar from "../specific/NameAvatar";
import { Add } from "@mui/icons-material";

const AddMemberDialog = ({ setIsAddFriend, isAddFriend }) => {
  // to do
  const availableFriend = sampleGroupMember;
  console.log(availableFriend);

  return (
    <div>
      <Dialog
        onClick={() => {
          setIsAddFriend(false);
        }}
        open={isAddFriend}
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Typography variant="h5" className=" w-full pt-10 pb-5 text-center ">
            Available Friends
          </Typography>
          <div className=" flex flex-col gap-2 w-[500px] p-3 px-10">
            {availableFriend.map((user, index) => (
              <div
                className="flex items-center justify-between p-1 py-0"
                key={index}
              >
                <NameAvatar name={user.name} avatar={user.avatar[0]} />
                <div className=" rounded-full bg-blue-600">
                  <IconButton size="small">
                    {/* add api call  */}
                    <Add className="text-white"></Add>
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
          <div className=" flex justify-center m-4">
            <Button onClick={() => setIsAddFriend(false)} variant="contained">
              Submit Changes
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddMemberDialog;
