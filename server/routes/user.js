import express from "express";
import { login, newUser } from "../controllers/user.js";
const userRouter = express.Router();

// ################################## USER ROUTES ###################################
// upload avatar for the user
userRouter.post("/new", newUser);
// login route for the user
userRouter.post("/login", login);

export default userRouter;
