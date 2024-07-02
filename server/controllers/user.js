import { User } from "../models/user.js";

const newUser = async (req, res) => {
  const avatar = {
    public_id: "Sdfdfsaf",
    url: "sdfss",
  };

  await User.create({
    name: "Lakhan",
    username: "Lakhan",
    password: "Lakhan",
    avatar,
  });
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  res.status(201).json({
    success: true,
    message: "User Created Successfully",
  });
};

const login = (req, res) => {
  res.send("Login successful!");
};

export { newUser, login };
