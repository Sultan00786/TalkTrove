import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { emitEvent, sendToken } from "../utils/feature.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHnadle } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { uploadImage } from "../lib/cloudinaryConfig.js";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;
  const image = req.file;

  if (!image) return next(new ErrorHnadle("Please Upload a Image", 400));
  // console.log(req);

  const avatarUri = await uploadImage(image);

  const avatar = {
    public_id: avatarUri.public_id,
    url: avatarUri.url,
  };

  const newUser = await User.create({
    name: name,
    username: username,
    password: password,
    avatar: avatar,
  });

  console.log(newUser);

  sendToken(res, newUser, 201, "User Created!!!");
});

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username }).select("+password");
  if (!user) return next(new ErrorHnadle("Invalid Username", 401));

  const isMatchPwd = compare(password, user.password);
  if (!isMatchPwd) return next(new ErrorHnadle("Invalid Password", 401));

  sendToken(res, user, 200, "Login Successful!!!");
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.userId);

  res.status(200).json({
    success: true,
    message: "Get My Profile Successful!!!",
    data: user,
  });
});

const logout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("ChatApp_token", "", { ...cookieOptions, maxAge: 0 })
    .json({ success: true, message: "Logged Out Successfully!!!" });
});

const searchUser = TryCatch(async (req, res, next) => {
  const { name } = req.query;

  const chats = await Chat.find({
    groupChat: { $ne: true },
    // find from members array of chat
    members: req.userId,
  });

  const chatMembers = chats.map((chat) => chat.members).flat();
  const membersExpectChatMembers = await User.find({
    _id: { $nin: chatMembers },
    name: { $regex: name, $options: "i" },
  });

  const data = membersExpectChatMembers.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    message: "Search User Successful!!!",
    data: data,
  });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.userId, reciever: userId },
      { sender: userId, reciever: req.userId },
    ],
  });
  if (request) return next(new ErrorHnadle("Request already sent", 401));

  await Request.create({
    sender: req.userId,
    reciever: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend Request Sent!!!",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;
  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("reciever", "name");

  if (!request) return next(new ErrorHnadle("Request not found", 404));

  if (request.reciever._id.toString() !== req.userId)
    return next(
      new ErrorHnadle("You are not authorized to accept this request", 401)
    );

  if (!accept) {
    await Request.findByIdAndDelete(requestId);
    return res.status(200).json({
      success: true,
      message: "Friend Request Rejected!!!",
    });
  }

  const members = [request.sender._id, request.reciever._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.reciever.name}`,
    }),
    Request.findByIdAndDelete(requestId),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted!!!",
    senderId: request.sender._id,
  });
});

const getNotification = TryCatch(async (req, res, next) => {
  const requests = await Request.find({ reciever: req.userId }).populate(
    "sender",
    "name avatar"
  );
  const data =
    requests.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
    })) || [];

  return res.status(200).json({
    success: true,
    message: "Get Notification Successful!!!",
    data: data,
  });
});

const getMyFriend = TryCatch(async (req, res, next) => {
  const { chatId } = req.query;

  const chats = await Chat.find({
    groupChat: { $ne: true },
    members: req.userId,
  }).populate("members", "name avatar");

  const friend = chats.map((chat) => {
    const otherFriends = getOtherMember(chat.members, req.userId);
    return {
      _id: otherFriends._id,
      name: otherFriends.name,
      avatar: otherFriends.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);
    const avialableMembers = friend.filter(
      (friend) => !chat.members.includes(friend._id)
    );
    return res.status(200).json({
      success: true,
      message: "Get My Friend Successful!!!",
      data: avialableMembers,
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Get My Friend Successful!!!",
      data: friend,
    });
  }
});

export {
  newUser,
  login,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getNotification,
  getMyFriend,
};
