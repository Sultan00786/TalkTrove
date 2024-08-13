import { Grid } from "@mui/material";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllUserChats,
  getChatDetails,
} from "../../operation/apiController/chatApi";
import { getUser } from "../../operation/apiController/userApi";
import { sampleChats, sampleUser } from "../constant/sampleData";
import GroupChatEditList from "../editGroup/GroupChatEditList";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";
import Loader from "./Loader";
import { io } from "socket.io-client";
import { setSocket } from "../../operation/reducer/socketSlice";

const AppLayout =
  () =>
  (WrappedCommponent, isGroupEdit = false) => {
    return (props) => {
      const params = useParams();
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const chatId = params.chatId;
      const [userData, setUserData] = useState(sampleUser);
      const [chatList, setChatList] = useState(sampleChats);
      const [members, setMembers] = useState([]);
      const [loading, setLoading] = useState(false);
      const socket = useMemo(() =>
        io(
          import.meta.env.VITE_BASE_SERVER,
          {
            withCredentials: true,
          },
          []
        )
      );
      dispatch(setSocket(socket));

      const handleDeleteChat = (e, _id, groupChat) => {
        e.preventDefault();
        console.log("Chat Delete", _id, groupChat);
      };

      useEffect(() => {
        const fetchCurrentUserAndAllChats = async () => {
          setLoading(true);

          const data = await getUser();
          if (data) setUserData(data);

          const allChats = await getAllUserChats();
          if (allChats) setChatList(allChats);

          setLoading(false);
        };
        fetchCurrentUserAndAllChats();

        const fetchChatdetails = async () => {
          setLoading(true);
          const result = await getChatDetails(chatId, navigate);
          // console.log("Chat Details", result.members);
          setMembers(result.members);
          setLoading(false);
        };
        if (chatId) fetchChatdetails();
      }, []);

      if (loading) {
        return (
          <>
            <Title title="Chat App" />
            <Loader />
          </>
        );
      }

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
                      chats={chatList}
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
                  <WrappedCommponent
                    {...props}
                    chatId={chatId}
                    members={members}
                  />
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
                    <Profile user={userData} />
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
