import express from "express";
import { allChat, allUser } from "../controllers/admin.js";
const adminRouter = express.Router();

adminRouter.get("/");

adminRouter.post("/verify");
adminRouter.get("/logout");

adminRouter.get("/user", allUser);
adminRouter.get("/chats", allChat);
adminRouter.get("/messages");
adminRouter.get("/stats");

export { adminRouter };
