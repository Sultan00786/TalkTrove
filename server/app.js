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

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGODB_URI;

connectDB(mongoDbUrl);

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
