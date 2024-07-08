import express from "express";
import {
  acceptFriendRequest,
  getMyFriend,
  getMyProfile,
  getNotification,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticat } from "../middlewares/isAuthenticat.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  searchUserValidator,
  sendAttachmentsValidator,
  sendFriendRequestValidator,
  validatorHandler,
} from "../lib/validators.js";

const userRouter = express.Router();

// ################################## USER ROUTES ###################################

// upload avatar for the user
userRouter.post(
  "/new",
  singleAvatar,
  registerValidator(),
  validatorHandler,
  newUser
);
// login route for the user
userRouter.post("/login", loginValidator(), validatorHandler, login);

// Afer user login to be accessible in all other routes
userRouter.use(isAuthenticat);
userRouter.get("/myprofile", getMyProfile);
userRouter.post("/logout", logout);
userRouter.get("/search", searchUserValidator(), validatorHandler, searchUser);
userRouter.put(
  "/sendRequest",
  sendFriendRequestValidator(),
  validatorHandler,
  sendFriendRequest
);
userRouter.put(
  "/accept-request",
  acceptRequestValidator(),
  validatorHandler,
  acceptFriendRequest
);
userRouter.get("/notification", getNotification);
userRouter.get("/getMyFriend", getMyFriend);

export default userRouter;
