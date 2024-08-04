import { Edit } from "@mui/icons-material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sampleGroupMember } from "../constant/sampleData";
import AppLayout from "../layout/AppLayout";
import GroupMembersEdit from "./GroupMembersEdit";
import AddMemberDialog from "./AddMemberDialog";
import DeleteGroup from "./DeleteGroup";

const GroupEdit = () => {
  const param = useParams();
  const navigate = useNavigate();
  const chatId = param.chatId;
  const [isAddFriend, setIsAddFriend] = useState(false);
  const [isGroupDelete, setIsGroupDelete] = useState(false);
  // to do --> fetch group members from api
  const groupMembers = sampleGroupMember;
  console.log(groupMembers);
  return (
    <div className=" bg-gray-100 h-full overflow-x-hidden overflow-y-auto px-3 pt-4">
      <div className=" mb-16">
        <div className=" fixed w-fit rounded-full bg-black">
          <IconButton onClick={() => navigate("/")}>
            <KeyboardBackspaceIcon className="text-white" />
          </IconButton>
        </div>
        {/* to do group name fetch from api */}
        <div className=" pt-10 text-center text-4xl text-gray-700">
          Group Name?
          <IconButton>
            <Edit />
          </IconButton>
        </div>
      </div>
      <div className=" px-24 mb-20">
        <Typography variant="h5">Members</Typography>
        <div className="flex flex-col gap-6 mt-5">
          {groupMembers.map((user, index) => (
            <GroupMembersEdit key={index} user={user} />
          ))}
        </div>
      </div>
      <div className=" px-24 mb-10 flex gap-8 justify-center items-center">
        {/* onclick to do */}
        <Button onClick={() => setIsGroupDelete(true)} color="error">
          DELETE GROUP
        </Button>
        <Button onClick={() => setIsAddFriend(true)} variant="contained">
          ADD MEMBER
        </Button>
      </div>
      {isAddFriend && (
        <AddMemberDialog
          setIsAddFriend={setIsAddFriend}
          isAddFriend={isAddFriend}
        />
      )}
      {isGroupDelete && (
        <DeleteGroup
          setIsGroupDelete={setIsGroupDelete}
          isGroupDelete={isGroupDelete}
        />
      )}
    </div>
  );
};

export default AppLayout()(GroupEdit, true);
