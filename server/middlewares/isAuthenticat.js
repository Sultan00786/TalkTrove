import jwt from "jsonwebtoken";
import { ErrorHnadle } from "../utils/utility.js";
import { TryCatch } from "./error.js";

const isAuthenticat = TryCatch(async (req, res, next) => {
  const { ChatApp_token } = req.cookies;
  if (!ChatApp_token) next(new Error("User not login"));

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
  const isMatch = sceretKey === process.env.ADMIN_SECRET;

  if (!isMatch) return next(new ErrorHnadle("You are not an admin", 401));

  next();
});

export { isAuthenticat, adminOnly };
