import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import { renameGroup } from "../../operation/apiController/chatApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../operation/reducer/userSlice";

function RenameDialog({ setIsRename, isRename, chatId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");

  const { toggle } = useSelector((state) => state.user);

  const handlerGrpNameChange = async () => {
    const data = await renameGroup(groupName, chatId, navigate);
    if (data) dispatch(setToggle(!toggle));
    setIsRename(false);
  };
  return (
    <Dialog open={isRename} onClose={() => setIsRename(false)}>
      <div className=" mt-4 mx-8 h-52 mb-3 ">
        <DialogTitle className="text-center">Rename Group</DialogTitle>
        <div className="mt-4"></div>
        <TextField
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          label="Group Name"
          variant="outlined"
        />
        <div className=" w-full flex justify-evenly mt-5">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setIsRename(false)}
          >
            Cancel
          </Button>
          <Button onClick={handlerGrpNameChange} variant="contained">
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default RenameDialog;
