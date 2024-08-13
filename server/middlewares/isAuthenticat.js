import jwt from "jsonwebtoken";
import { ErrorHnadle } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import { User } from "../models/user.js";

const isAuthenticat = TryCatch(async (req, res, next) => {
  let { ChatApp_token } = req.cookies;
  if (!ChatApp_token) {
    next(new Error("User not login"));
  }
  const decodedToken = jwt.verify(ChatApp_token, process.env.JWT_SECRET);
  req.userId = decodedToken._id;
  next();
});

const adminOnly = TryCatch(async (req, res, next) => {
  console.log(req.cookies);
  const { adminToken } = req.cookies;
  if (!adminToken) return next(new ErrorHnadle("You are not an admin", 401));

  const decodedToken = jwt.verify(adminToken, process.env.JWT_SECRET);
  const sceretKey = decodedToken;
  const isMatch = sceretKey === process.env.ADMIN_SCERET_KEY;

  if (!isMatch) return next(new ErrorHnadle("You are not an admin", 401));

  next();
});

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies["ChatApp_token"];
    if (!authToken) return next(new ErrorHnadle("User not login", 401));
    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);
    if (!user) return next(new ErrorHnadle("User not found", 404));

    socket.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHnadle("User not login", 401));
  }
};

export { isAuthenticat, adminOnly, socketAuthenticator };
