import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import React from "react";
import { deleteGroup } from "../../operation/apiController/chatApi";
import { useParams, useNavigate } from "react-router-dom";

function DeleteGroup({ setIsGroupDelete, isGroupDelete }) {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const handlerGroupDelete = async () => {
    console.log("delete");
    const result = await deleteGroup(chatId, navigate);
    setIsGroupDelete(false);
  };

  return (
    <Dialog
      onClick={(e) => {
        setIsGroupDelete(false);
      }}
      open={isGroupDelete}
    >
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="p-5 flex flex-col gap-3"
      >
        <Typography variant="h5" className="text-center">
          Confirm Delete
        </Typography>
        <p className="text-center text-red-600 text-lg">
          Are you sure you want to delete this Group ?
        </p>
        <div className="flex gap-3 items-center justify-end">
          <Button onClick={() => setIsGroupDelete(false)}>NO</Button>
          <Button onClick={handlerGroupDelete}>YES</Button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteGroup;
