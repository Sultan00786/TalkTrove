import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Typography } from "@mui/material";

function Home() {
  return (
    <div className=" text-center pt-3 h-full">
      <Typography variant="h4" className=" ">
        Select a friend to chat
      </Typography>
    </div>
  );
}

export default AppLayout()(Home);
