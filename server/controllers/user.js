import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/feature.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHnadle } from "../utils/utility.js";

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
  if (!isMatchPwd) console.log("nope");
  return next(new ErrorHnadle("Invalid Password", 401));

  sendToken(res, user, 200, "Login Successful!!!");
});

const getMyProfile = async (req, res, next) => {};

export { newUser, login, getMyProfile };
