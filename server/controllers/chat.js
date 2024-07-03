import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/feature.js";
import { ErrorHnadle } from "../utils/utility.js";

const newGroup = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    // including the creator there 3 members in group
    return next(new ErrorHnadle("Group chat must have at least 3 members"));
  }

  const allMembers = [...members, req.userId];

  console.log(">>>>>>>>>>>>>>>>>" + req.userId);
  await Chat.create({
    name: name,
    groupChat: true,
    creator: req.userId,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome tot ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);

  res.status(200).json({
    success: true,
    message: "New group created",
  });
});

export { newGroup };
