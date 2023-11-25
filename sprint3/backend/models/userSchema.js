const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
