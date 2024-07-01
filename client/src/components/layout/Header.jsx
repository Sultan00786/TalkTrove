import {
  AppBar,
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

const SearchDialog = lazy(() => import("../specific/SearchDialog"));
const NewGroupDialog = lazy(() => import("../dialog/NewGroupDialog"));
const NotificationDialog = lazy(() => import("../specific/NotificationDialog"));

const Header = () => {
  const navigate = useNavigate();
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

  function handleLogOut() {
    console.log("click on handleLogOut");
  }

  function handleNotification() {
    setIsNofication((prev) => !prev);
  }

  return (
    <>
      <Box flexGrow={1}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
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
        <Suspense fallback={<div>Loding.............</div>}>
          <SearchDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<div>Loding.............</div>}>
          <NewGroupDialog />
        </Suspense>
      )}
      {isNofication && (
        <Suspense fallback={<div>Loding.............</div>}>
          <NotificationDialog />
        </Suspense>
      )}
    </>
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
