import express from "express";
import userRouter from "./routes/user.js";
import { login, newUser } from "./controllers/user.js";
import { connect } from "mongoose";
import { connectDB } from "./utils/feature.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGODB_URI;

connectDB(mongoDbUrl);

const app = express();

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
