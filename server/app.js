import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import chatRouter from "./routes/chat.js";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/feature.js";
import {
  createSampleChat,
  createSampleGroupChat,
  createSampleGroupMessage,
  createSampleMessage,
} from "./seeders/chat.js";
import { adminRouter } from "./routes/admin.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE } from "./constants/events.js";
import { v4 as uuid } from "uuid";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGODB_URI;

connectDB(mongoDbUrl);

const app = express();
const server = createServer(app);
const io = new Server(server, {});

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

io.on("connection", (socket) => {
  const user = {
    _id: "XXXXXXXX",
    name: "John Doe",
  };

  console.log("Connected to socket.io");
  console.log(`User ${socket.id} is connected`);

  socket.on(NEW_MESSAGE, ({ chatId, members, message }) => {
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
    console.log(`New message`, messageForRealTime);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} is disconnected`);
  });
});

app.use(errorMiddleware);
server.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV.trim()} MODE`
  );
});
