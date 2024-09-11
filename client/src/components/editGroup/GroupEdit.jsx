import { Edit } from "@mui/icons-material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AddMemberDialog from "./AddMemberDialog";
import DeleteGroup from "./DeleteGroup";
import GroupMembersEdit from "./GroupMembersEdit";
import { getChatDetails } from "../../operation/apiController/chatApi";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../operation/reducer/userSlice";
import { set } from "react-hook-form";
import RenameDialog from "./RenameDialog";

const GroupEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const param = useParams();
  const chatId = param.chatId;

  const [isAddFriend, setIsAddFriend] = useState(false);
  const [isGroupDelete, setIsGroupDelete] = useState(false);
  const [isRename, setIsRename] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);

  const { toggle } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      const data = await getChatDetails(chatId, navigate, true);
      if (data) {
        setGroupDetails(data);
      }
    };
    fetchGroupDetails();
  }, [toggle]);

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
          {groupDetails?.name}
          <IconButton onClick={() => setIsRename(true)}>
            <Edit />
          </IconButton>
        </div>
      </div>
      <div className=" px-24 mb-20">
        <Typography variant="h5">Members</Typography>
        <div className="flex flex-col gap-6 mt-5">
          {groupDetails?.members?.map((user, index) => (
            <div key={index}>
              <GroupMembersEdit user={user} />
            </div>
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
      {isRename && (
        <RenameDialog
          setIsRename={setIsRename}
          isRename={isRename}
          chatId={chatId}
        />
      )}
      {isAddFriend && (
        <AddMemberDialog
          setIsAddFriend={setIsAddFriend}
          isAddFriend={isAddFriend}
          members={groupDetails?.members?.map((user) => user._id)}
          chatId={chatId}
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
