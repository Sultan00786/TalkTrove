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
  const response = res
    .status(code)
    .cookie("ChatApp_token", token, cookieOptions)
    .json({
      success: true,
      message: message,
      userData: user,
      token: token,
    });
  return response;
};

const emitEvent = (req, event, users, data) => {
  console.log("Event name is ", event);
  console.log(data);
};

const deleteFilesFromCloudinary = async (public_ids) => {
  // Delete Files from cloudinary
};

export {
  connectDB,
  sendToken,
  emitEvent,
  deleteFilesFromCloudinary,
  cookieOptions,
};
