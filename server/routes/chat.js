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

chatRouter.post("/newGroup", newGroupValidator(), validatorHandler, newGroup);
chatRouter.get("/getMyChats", getMyChats);
chatRouter.get("/getMyChats/group", getMyGroups);
chatRouter.put(
  "/addMembers",
  addMembersValidator(),
  validatorHandler,
  addMembers
);
chatRouter.put(
  "/removeMember",
  removeMembersValidator(),
  validatorHandler,
  removeMember
);
chatRouter.delete(
  "/leaveGroup/:id",
  leaveGroupValidator(),
  validatorHandler,
  leaveGroup
);
chatRouter.post(
  "/sendAttachments",
  multipleAttachemnts,
  sendAttachmentsValidator(),
  validatorHandler,
  sendAttachments
);

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
