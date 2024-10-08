import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/feature.js";
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
  const chats = await Chat.find({ members: req.userId }).populate(
    "members",
    "name avatar"
  );

  if (!chats) {
    return next(new ErrorHnadle("User chat not found", 404));
  }

  const transformChats = chats.map(({ _id, name, groupChat, members }) => {
    let friendUser = [];
    if (!groupChat) {
      friendUser = members.filter(
        (member) => member._id.toString() !== req.userId.toString()
      );
    }
    return {
      _id: _id,
      groupChat: groupChat,
      name: groupChat ? name : friendUser[0].name,
      avatar: !groupChat
        ? [friendUser[0].avatar.url]
        : members.slice(0, 3).map((user) => user.avatar.url),
      members: !groupChat
        ? [friendUser[0]._id]
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
  const chats = await Chat.find({
    members: req.userId,
    groupChat: true,
  }).populate("members", "name avatar");

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

  const allNewMemberName = allNewMemberPromisDone
    .map((user) => user.name)
    .join(",");

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

const removeMember = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;
  const loginUser = req.userId;

  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) return next(new ErrorHnadle("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHnadle("This is not a group chat", 400));

  if (chat.creator.toString() === userId)
    return next(new ErrorHnadle("Creator can't be remove the group", 403));

  if (chat.creator.toString() !== loginUser.toString())
    return next(
      new ErrorHnadle("Only creator of group can remove old members", 400)
    );

  if (chat.members.length <= 3)
    return next(new ErrorHnadle("Group must have at least 3 members", 400));

  chat.members = chat.members.filter((i) => i.toString() !== userId);
  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved.name} removed from members of group chat`
  );

  return res.status(200).json({
    success: true,
    message: "Member removed successfully from the group",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHnadle("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHnadle("This is not a group chat", 400));

  if (chat.creator.toString() === req.userId.toString()) {
    chat.creator = getRandomMemberId(chat.members, req.userId.toString());
  }

  chat.members = chat.members.filter(
    (user) => user._id.toString() !== req.userId.toString()
  );
  const [leftUserName] = await Promise.all([
    User.findById(req.userId, "name"),
    chat.save(),
  ]);

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${leftUserName.name} left the group chat`
  );
  return res.status(200).json({
    success: true,
    message: "Member left the group !!!",
  });
});

const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;

  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.userId, "name"),
  ]);

  if (!chat) return next(new ErrorHnadle("Chat not found", 404));

  const files = req.files || [];
  if (files.length < 1)
    return next(new ErrorHnadle("Please provide attachements", 400));
  if (files.length > 3)
    return next(new ErrorHnadle("Maximum 3 attachements are allowed", 400));

  // Upload files here
  const attachment = [];

  const messageForDB = {
    content: "",
    attachment: attachment,
    sender: req.userId || me._id,
    chat: chatId,
  };

  const messageData = await Message.create(messageForDB);

  const messageForRealeTime = {
    content: "",
    attachment: attachment,
    sender: {
      _id: me._id,
      name: me.name,
    },
    chat: chatId,
  };

  emitEvent(req, NEW_ATTACHMENT, chat.memgers, {
    message: messageForRealeTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  return res.status(200).json({
    success: true,
    message: "Attachements sent successfully",
    data: messageData,
  });
});

const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean(); // it convert mongodb object into js object

    if (!chat) return next(new ErrorHnadle("Chat not found", 404));

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      message: "Chat deatils send successfully",
      data: chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return next(new ErrorHnadle("Chat not found", 404));
    return res.status(200).json({
      success: true,
      message: "Chat deatils send successfully",
      data: chat,
    });
  }
});

const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHnadle("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHnadle("This is not a group chat", 400));
  if (chat.creator.toString() !== req.userId.toString())
    return next(new ErrorHnadle("You not allowed to rename the group", 403));

  chat.name = name;
  chat.save();

  return res.status(200).json({
    success: true,
    message: "Successfully rename the group !!",
  });
});

const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHnadle("Chat not found", 404));

  const members = chat.members;

  if (chat.groupChat && chat.creator.toString() !== req.userId.toString())
    return next(new ErrorHnadle("You not allowed to delete the group", 403));

  // Here we have to delete all messages as well as attachements or files from cloudinary
  const messagesWithAttachemets = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messagesWithAttachemets.forEach(({ attachments }) =>
    attachments.forEach(({ public_id }) => public_ids.push(public_id))
  );

  await Promise.all([
    Message.deleteMany({ chat: chatId }),
    chat.deleteOne(),
    // Delete files from cloudinary
    deleteFilesFromCloudinary(public_ids),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
});

const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { page = 1 } = req.query;

  const resultParPage = 20;
  const skip = (page - 1) * resultParPage;

  const [messages, total] = await Promise.all([
    Message.find({ chat: chatId })
      .populate("sender", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(resultParPage)
      .lean(),
    Message.countDocuments({ chat: chatId }), // it count all number of found message from the query
  ]);

  // Math.ceil(4.3) = 5
  // Math.floor(4.3) = 4
  const totalPages = Math.ceil(total / resultParPage);

  return res.status(200).json({
    success: true,
    message: "Messages send successfully",
    data: {
      messages: messages.reverse(), // it will show latest message first
      totalPages,
    },
  });
});

export {
  newGroup,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
};
