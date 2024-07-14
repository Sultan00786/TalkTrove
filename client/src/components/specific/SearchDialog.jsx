import { Add, Search } from "@mui/icons-material";
import {
  Dialog,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleChats } from "../constant/sampleData";

function SearchDialog({ open, handleSearch }) {
  const users = sampleChats;

  const handler = (e) => {
    e.preventDefault();
    // This will stop the click event from reaching the Dialog's onClick
    e.stopPropagation();
  };
  return (
    <div>
      <Dialog onClick={handleSearch} open={open}>
        <div
          onClick={handler}
          className=" lg:min-w-[500px] lg:min-h-96 flex flex-col gap-5 items-center p-4 "
        >
          <Typography variant="h6">Find People</Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            className=" px-6 bor w-full rounded-sm"
          ></TextField>
          <div className=" w-full px-16 pt-3 flex flex-col gap-4">
            {users.map((user) => (
              <div className="flex items-center justify-between">
                <div className=" flex items-center gap-3">
                  <img
                    src={user.avatar[0]}
                    alt=""
                    className="w-9 h-9 rounded-full  "
                  />{" "}
                  <p>{user.name}</p>
                </div>
                <div className=" bg-blue-500 w-fit rounded-full hover:bg-blue-600 ">
                  <IconButton className=" w-8 h-8 ">
                    <Add className=" text-white" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default SearchDialog;
