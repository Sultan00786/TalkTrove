import { Grid } from "@mui/material";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setLoading } from "../../operation/reducer/userSlice";

const AppLayout =
  () =>
  (WrappedCommponent, isGroupEdit = false) => {
    return (props) => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const params = useParams();

      const [userData, setUserData] = useState(sampleUser);
      const [chatList, setChatList] = useState(sampleChats);
      const [perticularChatId, setPerticularChatI] = useState("");

      const [members, setMembers] = useState([]);

      // const [loading, setLoading] = useState(false);
      const { loading } = useSelector((state) => state.user);

      const chatId = params.chatId;

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
          dispatch(setLoading(true));

          const data = await getUser();
          if (data) setUserData(data);

          const allChats = await getAllUserChats();
          if (allChats) setChatList(allChats);

          dispatch(setLoading(false));
        };
        fetchCurrentUserAndAllChats();

        const fetchChatdetails = async () => {
          dispatch(setLoading(true));
          const result = await getChatDetails(chatId, navigate);
          // console.log("Chat Details", result.members);
          setMembers(result.members);
          dispatch(setLoading(false));
        };
        if (chatId) fetchChatdetails();
      }, [perticularChatId]);

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
                {/* Chat list or group chat list  */}
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
                      setPerticularChatI={setPerticularChatI}
                    />
                  )}
                </Grid>

                {/* wrapped commponent  */}
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

                {/* if isGroupEdit is false the show Profile */}
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
