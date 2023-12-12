const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuizSchema = new Schema({
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
  timeSpent: {
    type: Number,
    required: true,
  },
  quizDate: {
    type: Date,
    default: Date.now,
  },
});

const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  defaultLanguage: {
    type: String,
  },
  languagesStudied: {
    type: Array,
  },
  progressByLanguage: {
    type: Array,
  },
  sentencesLearned: {
    type: Number,
  },
  quizzes: [QuizSchema],
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
