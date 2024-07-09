import express from "express";
import {
  adminLogin,
  admintLogout,
  allChat,
  allMessage,
  allUser,
  getDashboardState,
} from "../controllers/admin.js";
import { adminLoginValidator, validatorHandler } from "../lib/validators.js";
const adminRouter = express.Router();

// ################################## ADMIN ROUTES ###################################

adminRouter.get("/");

adminRouter.post(
  "/verify",
  adminLoginValidator(),
  validatorHandler,
  adminLogin
);

adminRouter.get("/logout", admintLogout);
adminRouter.get("/user", allUser);
adminRouter.get("/chats", allChat);
adminRouter.get("/messages", allMessage);
adminRouter.get("/stats", getDashboardState);

export { adminRouter };
