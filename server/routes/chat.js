import express from "express";
import { isAuthenticat } from "../middlewares/isAuthenticat.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroup,
  removeMember,
  sendAttachments,
} from "../controllers/chat.js";
import { multipleAttachemnts, singleAvatar } from "../middlewares/multer.js";

const chatRouter = express.Router();

// ################################## CHAT ROUTES ###################################

// Afer user login to be accessible in all other routes
chatRouter.use(isAuthenticat); // use as middleware
chatRouter.post("/newGroup", newGroup); // create a new group
chatRouter.get("/getMyChats", getMyChats); // get all chats of the current user
chatRouter.get("/getMyChats/group", getMyGroups); // get all groups of the user
chatRouter.put("/addMembers", addMembers); // Add members to a group
chatRouter.put("/removeMember", removeMember); // Remove members from a group
chatRouter.delete("/leaveGroup/:id", leaveGroup); // Leave a group
chatRouter.post("/sendAttachments", multipleAttachemnts, sendAttachments); // Send attachments in user chat

export default chatRouter;
