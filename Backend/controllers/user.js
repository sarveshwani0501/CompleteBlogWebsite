const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

function generateToken(user) {
  const payload = {
    userName: user.userName,
    id: user._id,
    email: user.email,
    profilePic: user.profilePic,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
}

async function signUp(req, res) {
  try {
    const body = req.body;
    const { userName, email, password } = body;

    const findUserName = await User.findOne({ userName });
    if (findUserName) {
      return res.status(400).json({ message: "Username already exits" });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ message: "Email Id already exists" });
    }

    const user = await User.create({
      userName,
      email,
      password,
    });

    return res
      .status(201)
      .json({ message: "User data added successfully", user: user });
  } catch (error) {
    console.log("Sign Up error: ", error);
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });
  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const token = generateToken(user);

  res.cookie("token", token);

  return res.status(200).json({
    message: "User login successful",
    user: user,
  });
}

async function logout(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "User log out successful" });
}

module.exports = {
  signUp,
  login,
  logout,
};
