import express from "express";
import {
  adminLogin,
  admintLogout,
  allChat,
  allMessage,
  allUser,
  getAdminData,
  getDashboardState,
} from "../controllers/admin.js";
import { adminLoginValidator, validatorHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/isAuthenticat.js";
const adminRouter = express.Router();

// ################################## ADMIN ROUTES ###################################

adminRouter.post(
  "/verify",
  adminLoginValidator(),
  validatorHandler,
  adminLogin
);
adminRouter.use(adminOnly);
adminRouter.get("/", getAdminData);
adminRouter.get("/logout", admintLogout);
adminRouter.get("/user", allUser);
adminRouter.get("/chats", allChat);
adminRouter.get("/messages", allMessage);
adminRouter.get("/stats", getDashboardState);

export { adminRouter };
