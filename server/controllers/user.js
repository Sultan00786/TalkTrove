import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/feature.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHnadle } from "../utils/utility.js";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "Sdfdfsaf",
    url: "sdfss",
  };

  const newUser = await User.create({
    name: name,
    username: username,
    password: password,
    avatar: avatar,
  });

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

  return res.status(200).json({
    success: true,
    message: "Search User Successful!!!",
    data: name,
  });
});

export { newUser, login, getMyProfile, logout, searchUser };
