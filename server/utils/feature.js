import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = (url) => {
  mongoose
    .connect(url, { dbName: "talk-trove" })
    .then((data) => {
      console.log(`Connected to MongoDB on ${data.connection.host}`);
    })
    .catch((error) => {
      throw error;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("ChatApp_token", token, cookieOptions).json({
    success: true,
    message: message,
    userData: user,
    token: token,
  });
};

export { connectDB, sendToken };
