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

const getMyChats = TryCatch(async (req, res, next) => {
  console.log(req.userId);
  const chats = await Chat.find({ members: req.userId }).populate(
    "members",
    "name avatar"
  );

  if (!chats) {
    return next(new ErrorHnadle("User chat not found", 404));
  }

  const transformChats = chats.map(({ _id, name, groupChat, members }) => {
    return {
      _id: _id,
      groupChat: groupChat,
      name: groupChat ? name : members[0].name,
      avatar: !groupChat
        ? [members[0].avatar.url]
        : members.slice(0, 3).map((user) => user.avatar.url),
      members: !groupChat
        ? [members[0]._id]
        : members
            .filter((user) => user._id.toString() !== req.userId)
            .map((user) => user._id),
    };
  });

  res.status(200).json({
    success: true,
    message: "All chats sends successfully ",
    data: transformChats,
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  console.log(req.userId);
  const chats = await Chat.find({ members: req.userId }).populate(
    "members",
    "name avatar"
  );

  if (!chats) {
    return next(new ErrorHnadle("User chat not found", 404));
  }

  const transformChats = chats.map(({ _id, name, groupChat, members }) => {
    return {
      _id: _id,
      groupChat: groupChat,
      name: name,
      avatar: members.slice(0, 3).map((user) => user.avatar.url),
      members: members.map((user) => user._id),
    };
  });

  res.status(200).json({
    success: true,
    message: "All chats sends successfully ",
    data: transformChats,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  
})

export { newGroup, getMyChats, getMyGroups, addMembers};
