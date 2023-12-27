const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuizResultSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  maxScore: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Quiz = mongoose.model("QuizResult", QuizResultSchema);

module.exports = Quiz;
