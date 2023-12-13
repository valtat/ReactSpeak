const User = require("../models/userSchema");
const Profile = require("../models/profileSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_CHAT_SECRET,
} = require("../utils/keys");
const { redisClient } = require("../utils/db");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    validateUsername(username);

    await validateExisting(username, email);

    validatePassword(password);

    validateEmail(email);

    const user = await User.create({
      username,
      email,
      password, // Password is hashed in presave
    });

    await Profile.create({
      user: user._id,
      progressByLanguage: new Map(),
    });

    res.status(201).json({
      message: "User successfully created",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res) => {
  const user = req.user;

  await Profile.findOneAndUpdate(
    { user: user.id },
    { lastLogin: new Date() },
    { new: true }
  );
  console.log(user);

  const accessToken = generateAccessToken(user, "15m");
  const refreshToken = generateRefreshToken(user, req.body.rememberMe);

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

    const accessToken = generateAccessToken(user, "15m");

    res.status(200).json({
      message: "Access token refreshed",
      access_token: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking refresh token" });
  }
};

const generateChatToken = (req, res) => {
  const user = req.user;
  console.log(user);

  const payload = {
    id: user.id,
    username: user.username,
  };

  const chatToken = jwt.sign(payload, JWT_CHAT_SECRET, {
    expiresIn: "12h",
  });

  console.log(`Generated Token: ${chatToken}`);

  res.status(200).json({
    chat_token: chatToken,
  });
};

const generateAccessToken = (user, duration) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: duration });
};

const generateRefreshToken = (user, rememberMe) => {
  const expiry = rememberMe ? 7 : 1;

  const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: `${expiry}d`,
  });

  redisClient.set(refreshToken, user.id, "EX", expiry * 24 * 60 * 60);

  return refreshToken;
};

const validateUsername = (username) => {
  if (
    !validator.isAlphanumeric(username) ||
    !validator.isLength(username, { min: 3, max: 30 })
  ) {
    const error = new Error(
      "Username must be 3-30 characters long and contain only letters and numbers"
    );
    error.statusCode = 400;
    throw error;
  }
};

const validateExisting = async (username, email) => {
  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
    const error = new Error("Username already in use");
    error.statusCode = 400;
    throw error;
  }

  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    const error = new Error("Email already in use");
    error.statusCode = 400;
    throw error;
  }
};

const validatePassword = (password) => {
  if (!validator.isLength(password, { min: 8 })) {
    const error = new Error("Password must be at least 8 characters long");
    error.statusCode = 400;
    throw error;
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    const error = new Error(
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character"
    );
    error.statusCode = 400;
    throw error;
  }
};

const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    const error = new Error("Invalid email");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  generateChatToken,
};
