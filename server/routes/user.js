import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticat } from "../middlewares/isAuthenticat.js";

const userRouter = express.Router();

// ################################## USER ROUTES ###################################

// upload avatar for the user
userRouter.post("/new", singleAvatar, newUser);
// login route for the user
userRouter.post("/login", login);

// Afer user login to be accessible in all other routes
userRouter.use(isAuthenticat);
userRouter.get("/myprofile", getMyProfile);
userRouter.post("/logout", logout);
userRouter.get("/search", searchUser);

export default userRouter;
