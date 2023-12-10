const User = require("../models/userSchema");
const Profile = require("../models/profileSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/keys");
const { JWT_REFRESH_SECRET } = require("../utils/keys");
const { redisClient } = require("../utils/db");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password less than 8 characters" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hash,
    });

    res.status(201).json({
      message: "User successfully created",
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not successfully created",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const user = req.user;

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  await Profile.findOneAndUpdate(
    { user: user.id },
    { lastLogin: new Date() },
    { new: true }
  );

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m",
  });

  const expiry = req.body.rememberMe ? 7 : 1;

  const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: `${expiry}d`,
  });

  redisClient.set(refreshToken, user.id, "EX", expiry * 24 * 60 * 60);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User successfully logged in",
    access_token: accessToken,
  });
};

const logoutUser = (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  redisClient.del(refreshToken);

  res.cookie("refresh_token", "", { expires: new Date(0) });

  res.status(200).json({
    message: "User successfully logged out",
  });
};

const refreshAccessToken = async (req, res) => {
  console.log("refreshAccessToken called");
  const refresh_token = req.cookies.refresh_token;

  try {
    const userId = await redisClient.get(refresh_token);

    if (!userId) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({
      message: "Access token refreshed",
      access_token: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking refresh token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
