import { Add, Remove, Search } from "@mui/icons-material";
import {
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleChats } from "../constant/sampleData";

function NewGroupDialog({ open, handlerToShowCreateGroup }) {
  const users = sampleChats;
  let [members, setMembers] = useState([]);
  const [name, setName] = useState("");

  const handlerMemersAdd = (id) => {
    const updatedMembers = members.concat(id);
    if (updatedMembers) setMembers(updatedMembers);
  };

  const handlerRemoveMembers = (id) => {
    console.log(id);
    members = members.filter((member) => member !== id);
    if (members) setMembers(members);
    else setMembers([]);
    console.log(members);
  };

  const handlerCreateGroup = () => {
    const data = {
      name,
      members,
    };
    console.log(data);
    handlerToShowCreateGroup();
  };

  return (
    <div>
      <Dialog open={open}>
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
          <div className=" w-full px-16 pt-3 flex flex-col gap-4">
            {users.map((user, index) => (
              <div className="flex items-center justify-between">
                <div key={index} className=" flex items-center gap-3">
                  <img
                    src={user.avatar[0]}
                    alt=""
                    className="w-9 h-9 rounded-full  "
                  />{" "}
                  <p>{user.name}</p>
                </div>
                {!members?.includes(user._id) && (
                  <div
                    className=" bg-blue-500 w-fit rounded-full hover:bg-blue-600 "
                    onClick={() => handlerMemersAdd(user._id)}
                  >
                    <IconButton className=" w-8 h-8 ">
                      <Add className=" text-white" />
                    </IconButton>
                  </div>
                )}
                {members?.includes(user._id) && (
                  <div
                    className=" bg-red-500 w-fit rounded-full hover:bg-red-600 "
                    onClick={() => handlerRemoveMembers(user._id)}
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
