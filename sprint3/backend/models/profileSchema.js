const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  quizResults: { type: Schema.Types.ObjectId, ref: "Quiz" },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
