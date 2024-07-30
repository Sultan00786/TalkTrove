import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
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
  setToken,
  setUser,
} from "../../operation/reducer/userSlice";
import { apiConnector } from "../../operation/apiConnect";
import { userApiUrl } from "../../operation/apiUrl";
import { userLogout } from "../../operation/apiController/userApi";
import Loader from "./Loader";

const SearchDialog = lazy(() => import("../specific/SearchDialog"));
const NewGroupDialog = lazy(() => import("../dialog/NewGroupDialog"));
const NotificationDialog = lazy(() => import("../specific/NotificationDialog"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNofication, setIsNofication] = useState(false);

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
    console.log("click on handleLogOut");
    dispatch(userLogout(token, dispatch, navigate));
  }

  function handleNotification() {
    setIsNofication((prev) => !prev);
    console.log("click on handleNotification");
  }

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

            <Box>
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
                title={"Mange Group"}
                icon={<Group />}
                onClick={() => navigate("/groups")}
              />
              <IconBtn
                title={"Mange Group"}
                icon={<Notifications />}
                onClick={handleNotification}
              />
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
