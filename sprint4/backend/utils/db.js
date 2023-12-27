require("dotenv").config();
const mongoose = require("mongoose");
const Redis = require("ioredis");

const MONGO_URI = process.env.MONGO_URI;
const REDIS_URI = process.env.REDIS_URI;

const connectMongo = async () => {
  await mongoose.connect(MONGO_URI);
  console.log(`Connected to MongoDB`);
};

connectMongo();

const connectToRedis = async () => {
  try {
    redisClient = new Redis(REDIS_URI);
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Redis connection error", err);
  }
};

connectToRedis();

module.exports = { connectMongo, connectToRedis, redisClient };
