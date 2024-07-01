import express from "express";
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

export default userRouter;
