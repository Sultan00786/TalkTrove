import express from "express";
import { Login, newUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
const userRouter = express.Router();

// ################################## USER ROUTES ###################################
// upload avatar for the user
userRouter.post("/new", singleAvatar, newUser);
// login route for the user
userRouter.post("/login", Login);

export default userRouter;
