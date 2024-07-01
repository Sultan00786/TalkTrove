const newUser = (req, res) => {
  res.send("New user");
};

const login = (req, res) => {
  res.send("Login successful!");
};

export { newUser, login };
