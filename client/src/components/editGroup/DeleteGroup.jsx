import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import React from "react";

function DeleteGroup({ setIsGroupDelete, isGroupDelete }) {
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
          <Button>YES</Button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteGroup;
