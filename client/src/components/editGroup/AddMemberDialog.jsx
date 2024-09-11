import React, { useEffect, useState } from "react";
import { sampleGroupMember } from "../constant/sampleData";
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import NameAvatar from "../specific/NameAvatar";
import { Add, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addNewMembers } from "../../operation/apiController/chatApi";
import { setToggle } from "../../operation/reducer/userSlice";

const AddMemberDialog = ({ setIsAddFriend, isAddFriend, chatId, members }) => {
  const dispatch = useDispatch();

  const [availableFriend, setAvailableFriend] = useState([]);
  const [addMembers, setAddMembers] = useState([]);

  const { userFriends } = useSelector((state) => state.user);

  const handlerSubmit = async () => {
    console.log(addMembers);
    const data = await addNewMembers(chatId, addMembers);
    if (data) dispatch(setToggle((prev) => !prev));
    setIsAddFriend(false);
  };

  useEffect(() => {
    const newArray = userFriends?.filter(
      (chat) => !chat.groupChat && !members.includes(chat.members[0])
    );
    setAvailableFriend(newArray);
  }, []);

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
            {availableFriend.length === 0 ? (
              <h1 className="text-center text-2xl text-stone-500">
                There is no Friend available to add in this group
              </h1>
            ) : (
              availableFriend.map((user, index) => (
                <div
                  className="flex items-center justify-between p-1 py-0"
                  key={index}
                >
                  <NameAvatar name={user.name} avatar={user.avatar[0]} />
                  {!addMembers.includes(user.members[0]) ? (
                    <div
                      onClick={() =>
                        setAddMembers([...addMembers, user.members[0]])
                      }
                      className=" rounded-full bg-blue-500 hover:bg-blue-600"
                    >
                      <IconButton size="small">
                        {/* add api call  */}
                        <Add className="text-white"></Add>
                      </IconButton>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setAddMembers(
                          addMembers.filter((id) => id !== user._id)
                        );
                      }}
                      className=" rounded-full bg-red-500 hover:bg-red-600"
                    >
                      <IconButton size="small">
                        {/* add api call  */}
                        <Close className="text-white"></Close>
                      </IconButton>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className=" flex justify-center m-4">
            <Button onClick={handlerSubmit} variant="contained">
              Submit Changes
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddMemberDialog;
