import React from "react";
import error404 from "../media/error/error404.png";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Login, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-10 h-full">
      <div className=" w-fit flex flex-col items-center">
        <img src={error404} className="h-[300px]" />
        <p className=" font-semibold text-xl mt-1">
          THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST
        </p>
        <p className=" font-semibold text-gray-700">
          YOU MAY HAVE MISTYPED THE ADDRESS OF THE PAGE MAY HAVE MOVED
        </p>
        <div className="mt-5">
          {user ? (
            <Button
              variant="contained"
              endIcon={<Home />}
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<Login />}
              onClick={() => navigate("/login")}
            >
              Lets do Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotFound;
