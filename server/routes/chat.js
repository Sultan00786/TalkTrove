import express from "express";
import { isAuthenticat } from "../middlewares/isAuthenticat.js";
import { newGroup } from "../controllers/chat.js";

const chatRouter = express.Router();

// ################################## CHAT ROUTES ###################################

// Afer user login to be accessible in all other routes
chatRouter.use(isAuthenticat); // use as middleware
chatRouter.post("/newGroup", newGroup);

export default chatRouter;
