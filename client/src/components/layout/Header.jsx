import { AppBar, Box } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box flexGrow={1}>
      <AppBar
        position="static"
        sx={{ bgcolor: "rgb(239, 105, 105)" }}
        className="h-16 px-4 flex justify-center rounded-t-lg"
      >
        hellow
      </AppBar>
    </Box>
  );
};

export default Header;
