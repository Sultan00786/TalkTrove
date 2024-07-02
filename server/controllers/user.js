import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/feature.js";

const newUser = async (req, res) => {
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

async function Login(req, res) {
  const { username, password } = req.body;

  console.log(req.body);

  const user = await User.findOne({ username: username }).select("+password");
  if (!user) return res.status(400).json({ error: "Invalid UserName" });

  const isMatchPwd = compare(password, user.password);
  if (!isMatchPwd) res.status(400).json({ error: "Invalid Password" });

  sendToken(res, user, 200, "Login Successful!!!");
}

export { newUser, Login };
