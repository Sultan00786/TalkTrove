import React, { Suspense } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import Loader from "./Loader";
import ChatList from "../specific/ChatList";
import { sampleChats, sampleUser } from "../constant/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import GroupChatEditList from "../editGroup/GroupChatEditList";

const AppLayout =
  () =>
  (WrappedCommponent, isGroupEdit = false) => {
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
          {!isGroupEdit && (
            <>
              <Header />
              <div className=" mt-[4rem]"></div>
            </>
          )}

          <div>
            <Suspense fallback={<Loader />}>
              <Grid
                container
                height={isGroupEdit ? "100vh" : "calc(100vh - 4rem)"}
              >
                <Grid
                  item
                  sm={4}
                  md={3}
                  lg={isGroupEdit ? 4 : 3}
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                  height={"100%"}
                >
                  {isGroupEdit ? (
                    <GroupChatEditList />
                  ) : (
                    <ChatList
                      chats={sampleChats}
                      chatId={chatId}
                      handleDeleteChat={handleDeleteChat}
                    />
                  )}
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={8}
                  lg={isGroupEdit ? 8 : 6}
                  md={5}
                  height={"100%"}
                >
                  <WrappedCommponent {...props} />
                </Grid>

                {!isGroupEdit && (
                  <Grid
                    item
                    md={4}
                    lg={3}
                    sx={{
                      display: { xs: "none", md: "block" },
                    }}
                    height={"100%"}
                    className="bg-black bg-opacity-95 text-white"
                  >
                    <Profile user={sampleUser} />
                  </Grid>
                )}
              </Grid>
            </Suspense>
          </div>
        </div>
      );
    };
  };

export default AppLayout;
