import express from "express";
import { isAuthenticat } from "../middlewares/isAuthenticat.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  newGroup,
  removeMembers,
} from "../controllers/chat.js";

const chatRouter = express.Router();

// ################################## CHAT ROUTES ###################################

// Afer user login to be accessible in all other routes
chatRouter.use(isAuthenticat); // use as middleware
chatRouter.post("/newGroup", newGroup); // create a new group
chatRouter.get("/getMyChats", getMyChats); // get all chats of the current user
chatRouter.get("/getMyChats/group", getMyGroups); // get all groups of the user
chatRouter.put("/addMembers", addMembers); // Add members to a group
chatRouter.put("/removeMembers", removeMembers); // Remove members from a group

export default chatRouter;
