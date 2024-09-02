import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { orange } from "../constant/color";
import {
  Add,
  Group,
  Logout,
  Menu as MenuIcon,
  NotificationAdd,
  Notifications,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setNOTIFICATION,
  setToken,
  setUser,
} from "../../operation/reducer/userSlice";
import { apiConnector } from "../../operation/apiConnect";
import { userApiUrl } from "../../operation/apiUrl";
import {
  getAllNotification,
  userLogout,
} from "../../operation/apiController/userApi";
import Loader from "./Loader";
import { NEW_MESSAGE, NEW_REQUEST } from "../../constant/events";

const SearchDialog = lazy(() => import("../specific/SearchDialog"));
const NewGroupDialog = lazy(() => import("../dialog/NewGroupDialog"));
const NotificationDialog = lazy(() => import("../specific/NotificationDialog"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, NOTIFICATION } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);

  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNofication, setIsNofication] = useState(false);
  const [notificatnReq, setNotificatnReq] = useState([]);

  useEffect(() => {
    const fetchAllNotification = async () => {
      const result = await getAllNotification();
      setNotificatnReq(result);
    };
    fetchAllNotification();
  }, []);

  function handleMobile() {
    console.log("click on handleMobile");
  }

  const handleSearch = () => {
    setIsSearch((prev) => !prev);
  };

  function handleCreatGroup() {
    setIsNewGroup((prev) => !prev);
  }

  async function handleLogOut() {
    dispatch(userLogout(token, dispatch, navigate));
  }

  function handleNotification() {
    setIsNofication((prev) => !prev);
    localStorage.removeItem("NOTIFICATION");
    console.log(localStorage.getItem("NOTIFICATION"));
    dispatch(setNOTIFICATION(false));
  }

  // useEffect of NEW_REQUEST event handling
  useEffect(() => {
    socket.on(NEW_REQUEST, (data) => {
      console.log("NEW_REQUEST");
      console.log(data);
      localStorage.setItem("NOTIFICATION", data.isMsgRecieve);
      dispatch(setNOTIFICATION(data.isMsgRecieve));
    });
  }, [socket]);

  return (
    <div className=" z-100 shadow-xl ">
      <Box flexGrow={0} sx={{}}>
        <AppBar position="fixed" sx={{ bgcolor: orange }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              zIndex: 100,
            }}
          >
            <div>
              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: "bold",
                }}
              >
                TalkTrove
              </Typography>

              <Box
                sx={{
                  display: { xs: "block", sm: "none" },
                }}
              >
                <IconButton color="inherit" onClick={handleMobile}>
                  <MenuIcon />
                </IconButton>
              </Box>
            </div>

            <Box className="flex">
              <IconBtn
                title={"Search"}
                icon={<Search />}
                onClick={handleSearch}
              />
              <IconBtn
                title={"Add Group"}
                icon={<Add />}
                onClick={handleCreatGroup}
              />
              <IconBtn
                title={"Manage Group"}
                icon={<Group />}
                onClick={() => navigate("/groups")}
              />
              <div className=" relative w-fit">
                <IconBtn
                  title={"Notification"}
                  icon={<Notifications />}
                  onClick={handleNotification}
                />
                {NOTIFICATION && (
                  <div className=" w-2 h-2 absolute bg-green-600 rounded-full top-[13px] right-[13px] "></div>
                )}
              </div>
              <IconBtn
                title={"LogOut"}
                icon={<Logout />}
                onClick={handleLogOut}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog open={isSearch} handleSearch={handleSearch} />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog
            open={isNewGroup}
            handlerToShowCreateGroup={handleCreatGroup}
          />
        </Suspense>
      )}
      {isNofication && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog
            open={isNofication}
            handleNotification={handleNotification}
            notificatnReq={notificatnReq}
          />
        </Suspense>
      )}
    </div>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
