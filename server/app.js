import express from "express";
import userRouter from "./routes/user.js";
const port = 3000;

const app = express();

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
