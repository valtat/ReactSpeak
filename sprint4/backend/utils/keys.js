require("dotenv").config();

const keys = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_CHAT_SECRET: process.env.JWT_CHAT_SECRET,
};

module.exports = keys;
