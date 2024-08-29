import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import chatRouter from "./routes/chat.js";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/feature.js";
import { adminRouter } from "./routes/admin.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import { Message } from "./models/message.js";
import { getSockets } from "./lib/helper.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { socketAuthenticator } from "./middlewares/isAuthenticat.js";
import {
  createSampleChat,
  createSampleGroupChat,
  createSampleGroupMessage,
  createSampleMessage,
} from "./seeders/chat.js";
import {
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  USER_ONLINE_STATUS,
} from "./constants/events.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGODB_URI;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});
let userSocketIds = new Map();
let onlineUsers = [];
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

connectDB(mongoDbUrl);
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors(corsOptions));
app.use(express.json());

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/admin", adminRouter);

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});

io.on("connection", (socket) => {
  const user = socket.user;
  userSocketIds.set(user._id.toString(), socket.id);
  onlineUsers = Array.from(userSocketIds.keys());

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    // console.log(messageForRealTime);
    // console.log(members);

    let result = null;
    try {
      result = await Message.create(messageForDB)
        .then((createdMessage) => {
          return Message.populate(createdMessage, { path: "sender" });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.log(error);
    }

    const onlineMembersSockets = getSockets(members);
    io.to(onlineMembersSockets).emit(NEW_MESSAGE, {
      data: result,
    });
    io.to(onlineMembersSockets).emit(NEW_MESSAGE_ALERT, { chatId });
  });

  socket.emit(USER_ONLINE_STATUS, onlineUsers);

  socket.on("disconnect", () => {
    userSocketIds.delete(user._id.toString());
    onlineUsers.filter((id) => id !== user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV.trim()} MODE`
  );
});

export { userSocketIds };
