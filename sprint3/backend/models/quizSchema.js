const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuizSchema = new Schema({
  maxScore: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeSpent: {
    type: Number,
    required: true,
  },
  quizDate: {
    type: Date,
    default: Date.now,
  },
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
