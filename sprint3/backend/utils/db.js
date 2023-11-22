const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI);
  console.log(`Connected to database`);
};

module.exports = connectDB;
