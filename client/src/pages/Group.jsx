import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Typography } from "@mui/material";

function Group() {
  return (
    <Typography
      variant="h4"
      margin={4}
      className=" text-gray-500 mt-3 text-center "
    >
      Please select group for Edit
    </Typography>
  );
}

export default AppLayout()(Group, true);
