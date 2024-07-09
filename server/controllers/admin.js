import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";

const allUser = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  const data = await Promise.all(
    users.map(async ({ _id, name, avatar, username }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({
          groupChat: true,
          members: { $in: [_id] },
        }),
        Chat.countDocuments({
          groupChat: { $ne: true },
          members: { $in: [_id] },
        }),
      ]);
      return {
        name: name,
        username: username,
        avatar: avatar.url,
        _id: _id,
        groups,
        friends,
      };
    })
  );

  return res.status(200).json({
    message: "Users fetched successfully",
    data: data,
  });
});

const allChat = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const data = await Promise.all(
    chats.map(async ({ _id, groupChat, name, members, creator }) => {
      const totalMembers = members.length;
      const totalMessages = await Message.countDocuments({ chat: _id });

      return {
        _id,
        groupChat: groupChat,
        name,
        avatar: members.map((member) => member.avatar.url),
        members: members.map((member) => ({
          id: member._id,
          name: member.name,
          avatar: member.avatar.url,
        })),
        creator: groupChat
          ? {
              name: creator.name,
              avatar: creator.avatar.url,
            }
          : "none",
        totalMembers,
        totalMessages,
      };
    })
  );

  return res.status(200).json({
    message: "Chats fetched successfully",
    data: data,
  });
});

export { allUser, allChat };
