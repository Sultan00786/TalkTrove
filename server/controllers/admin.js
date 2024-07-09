import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { ErrorHnadle } from "../utils/utility.js";
import { cookieOptions } from "../utils/feature.js";

const adminLogin = TryCatch(async (req, res, next) => {
  const { sceretKey } = req.body;

  const isMatch = sceretKey === process.env.ADMIN_SCERET_KEY;

  console.log(sceretKey);
  console.log(process.env.ADMIN_SCERET_KEY);

  if (!isMatch) return next(new ErrorHnadle("Invalid secret key", 401));

  const token = jwt.sign(sceretKey, process.env.JWT_SECRET);

  return res
    .status(200)
    .cookie("adminToken", token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 1,
    })
    .json({
      success: true,
      message: "Login successfully, Wellocme Backe Bossssss !!!!!!",
    });
});

const admintLogout = TryCatch(async (req, res, next) => {
  res
    .status(200)
    .clearCookie("adminToken", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({ success: true, message: "Logout successfully" });
});

const getAdminData = TryCatch(async (req, res, next) => {
  return res.status(200).json({
    admin: true,
  });
});

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

const allMessage = TryCatch(async (req, res, next) => {
  const messages = await Message.find({}).populate("sender", "name avatar");

  const data = messages.map(
    ({ _id, content, sender, chat, attachment, createdAt }) => {
      return {
        _id,
        attachment: attachment ? attachment : [],
        content,
        createdAt,
        chat,
        sender: {
          id: sender._id,
          name: sender.name,
          avatar: sender.avatar.url,
        },
      };
    }
  );

  return res.status(200).json({
    message: "Messages fetched successfully",
    data: data,
  });
});

const getDashboardState = TryCatch(async (req, res, next) => {
  const [totalUsers, totalChats, totalMessages, totalGroupChats] =
    await Promise.all([
      User.countDocuments({}),
      Chat.countDocuments({}),
      Message.countDocuments({}),
      Chat.countDocuments({ groupChat: true }),
    ]);

  const today = new Date();
  const last7Day = new Date();

  last7Day.setDate(last7Day.getDate() - 7);

  console.log(today, "\n", last7Day);

  const last7DayMessage = await Message.find({
    createdAt: {
      $gte: last7Day,
      $lte: today,
    },
  }).select("createdAt");

  const messages = new Array(7).fill(0);
  console.log(messages);
  const dayInMilisecond = 1000 * 60 * 60 * 24;

  last7DayMessage.forEach((message) => {
    const index =
      (today.getTime() - message.createdAt.getTime()) / dayInMilisecond;

    const reverseIndex = 6 - Math.floor(index); // reverse the array according to 7 day in week
    messages[reverseIndex]++;
  });

  return res.status(200).json({
    message: "Dashboard state fetched successfully",
    data: {
      totalUsers,
      totalChats,
      totalMessages,
      totalGroupChats,
      messageChat: messages,
    },
  });
});

export {
  allUser,
  allChat,
  allMessage,
  getDashboardState,
  adminLogin,
  admintLogout,
  getAdminData
};
