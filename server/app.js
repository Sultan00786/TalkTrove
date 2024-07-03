import express from "express";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/feature.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chat.js";
import { createUser } from "./seeders/user.js";

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

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
