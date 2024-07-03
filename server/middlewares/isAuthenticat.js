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

export { isAuthenticat };
