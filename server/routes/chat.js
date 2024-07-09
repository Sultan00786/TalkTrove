import express from "express";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroup,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import {
  addMembersValidator,
  getMessagesValidator,
  leaveGroupValidator,
  newGroupValidator,
  removeMembersValidator,
  sendAttachmentsValidator,
  validatorHandler,
} from "../lib/validators.js";
import { isAuthenticat } from "../middlewares/isAuthenticat.js";
import { multipleAttachemnts } from "../middlewares/multer.js";

const chatRouter = express.Router();

// ################################## CHAT ROUTES ###################################

// Afer user login to be accessible in all other routes
chatRouter.use(isAuthenticat); // use as middleware
chatRouter.post("/newGroup", newGroupValidator(), validatorHandler, newGroup); // create a new group
chatRouter.get("/getMyChats", getMyChats); // get all chats of the current user
chatRouter.get("/getMyChats/group", getMyGroups); // get all groups of the user
chatRouter.put(
  "/addMembers",
  addMembersValidator(),
  validatorHandler,
  addMembers
); // Add members to a group
chatRouter.put(
  "/removeMember",
  removeMembersValidator(),
  validatorHandler,
  removeMember
); // Remove members from a group
chatRouter.delete(
  "/leaveGroup/:id",
  leaveGroupValidator(),
  validatorHandler,
  leaveGroup
); // Leave a group
chatRouter.post(
  "/sendAttachments",
  multipleAttachemnts,
  sendAttachmentsValidator(),
  validatorHandler,
  sendAttachments
); // Send attachments in user chat
// Get chat details, rename, delete
chatRouter
  .route("/:id")
  .get(getChatDetails)
  .put(renameGroup)
  .delete(deleteChat);

// Get messages
chatRouter.get(
  "/messages/:id",
  getMessagesValidator(),
  validatorHandler,
  getMessages
);

export default chatRouter;
