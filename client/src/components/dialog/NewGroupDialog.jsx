import { Add, Remove } from "@mui/icons-material";
import {
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { sampleChats } from "../constant/sampleData";
import { useSelector } from "react-redux";
import NameAvatar from "../specific/NameAvatar";
import toast from "react-hot-toast";
import { newGroupChat } from "../../operation/apiController/chatApi";

function NewGroupDialog({ open, handlerToShowCreateGroup }) {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);

  const { userFriends } = useSelector((state) => state.user);

  useEffect(() => {
    setChats(userFriends.filter((chat) => !chat.groupChat));
  });

  const handlerMemersAdd = (id) => {
    const updatedMembers = members.concat(id);
    if (updatedMembers) setMembers(updatedMembers);
  };

  const handlerRemoveMembers = (id) => {
    console.log(id);
    const newMembers = members.filter((member) => member !== id);
    if (newMembers) setMembers(newMembers);
    else setMembers([]);
    console.log(newMembers);
  };

  const handlerCreateGroup = () => {
    if (name === "") {
      toast.error("Please Enter the Group name");
      return;
    } else if (members.length < 2) {
      toast.error("Please select at least 2 members");
      return;
    }
    const data = {
      name,
      members,
    };
    const result = newGroupChat(data);
    console.log(data);
    handlerToShowCreateGroup();
  };

  return (
    <div>
      <Dialog onClose={handlerToShowCreateGroup} open={open}>
        <div className=" lg:min-w-[500px] lg:min-h-96 flex flex-col gap-5 items-center p-4 pt-3 ">
          <Typography pt={4} variant="h4">
            New Group
          </Typography>

          <TextField
            label="GroupName"
            className=" px-6 bor lg:w-[300px] rounded-sm"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          ></TextField>

          <div className=" w-full h-3/5 overflow-x-auto px-16 pt-3 flex flex-col gap-4">
            {chats.map((user, index) => (
              <div className="flex items-center justify-between">
                <div key={index} className=" flex items-center gap-3">
                  <NameAvatar avatar={user.avatar[0]} name={user.name} />
                </div>

                {!members?.includes(user.members[0]) && (
                  <div
                    className=" bg-blue-500 w-fit rounded-full hover:bg-blue-600 "
                    onClick={() => handlerMemersAdd(user.members[0])}
                  >
                    <IconButton className=" w-8 h-8 ">
                      <Add className=" text-white" />
                    </IconButton>
                  </div>
                )}

                {members?.includes(user.members[0]) && (
                  <div
                    className=" bg-red-500 w-fit rounded-full hover:bg-red-600 "
                    onClick={() => handlerRemoveMembers(user.members[0])}
                  >
                    <IconButton className=" w-8 h-8 ">
                      <Remove className=" text-white" />
                    </IconButton>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className=" w-full px-28 pt-9 marker: flex items-center justify-evenly">
            <Button
              onClick={handlerToShowCreateGroup}
              variant="contained"
              color="error"
            >
              Cancle
            </Button>
            <Button onClick={handlerCreateGroup} variant="contained">
              Create
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default NewGroupDialog;
