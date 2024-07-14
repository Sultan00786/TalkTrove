import React, { Suspense } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import Loader from "./Loader";
import ChatList from "../specific/ChatList";
import { sampleChats, sampleUser } from "../constant/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedCommponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Chat Delete", _id, groupChat);
    };

    return (
      <div>
        <Title title="Chat App" />
        <Header />
        <div className=" mt-[4rem]"></div>

        <div>
          
        </div>
      </div>
    );
  };
};

export default AppLayout;
