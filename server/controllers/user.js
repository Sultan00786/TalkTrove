import { User } from "../models/user.js";
import { sendToken } from "../utils/feature.js";

const newUser = async (req, res) => {
  console.log(req.body);

  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "Sdfdfsaf",
    url: "sdfss",
  };

  const newUser = await User.create({
    name: name,
    username: username,
    password: password,
    avatar: avatar,
  });

  sendToken(res, newUser, 201, "User Created!!!");
};

const login = (req, res) => {
  res.send("Login successful!");
};

export { newUser, login };
