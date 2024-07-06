import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { emitEvent } from "../utils/feature.js";
import { getRandomMemberId } from "../utils/fuction.js";
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
  const { chatId, members } = req.body;

  const chat = await Chat.findById(chatId);

  if (!members || members.length === 0)
    return next(new ErrorHnadle("Invaliad members", 403));
  if (!chat) return next(new ErrorHnadle("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHnadle("This is not a group chat", 400));
  if (chat.creator.toString() !== req.userId.toString())
    return next(
      new ErrorHnadle("Only creator of group can add a new members", 400)
    );

  const newMemberPromise = members.map((user) => User.findById(user, "name"));

  const allNewMemberPromisDone = await Promise.all(newMemberPromise);
  const allNewMember = allNewMemberPromisDone.map((user) => user._id);
  chat.members.push(...allNewMember);

  if (chat.members.length > 100)
    next(new ErrorHnadle("Maximum members limit reached", 400));
  await chat.save();

  const allNewMemberName = allNewMemberPromisDone.map((user) => user.name).join(",");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allNewMemberName} added as a members of group chat`
  );

  return res.status(200).json({
    success: true,
    message: "New member added successfully in the group",
  });
});

const removeMembers = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;

  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) return next(new ErrorHnadle("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHnadle("This is not a group chat", 400));
  if (chat.creator.toString() !== req.userId.toString())
    return next(
      new ErrorHnadle("Only creator of group can remove old members", 400)
    );
  if (chat.members.length <= 3)
    return next(new ErrorHnadle("Group must have at least 3 members", 400));

  chat.members.filter((i) => i._id !== userId);
  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved.name} removed from members of group chat`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Member removed successfully from the group",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const { chatId } = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHnadle("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHnadle("This is not a group chat", 400));

  if (chat.creator.toString() === req.userId.toString()) {
    chat.creator = getRandomMemberId(chat.members, req.userId.toString());
  }

  chat.members.filter((user) => user._id.toString() !== req.userId.toString());
  const [leftUserName] = await Promise.all([
    User.findById(req.userId, "name"),
    chat.save(),
  ]);

  emitEvent(req, ALERT, chat.members, `${leftUserName} left the group chat`);
  return res.status(200).json({
    success: true,
    message: "Member left the group !!!",
  });
});

export {
  newGroup,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup,
};
