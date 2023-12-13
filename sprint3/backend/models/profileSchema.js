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
    type: [String],
  },
  progressByLanguage: {
    type: Array,
  },
  sentencesLearned: {
    type: Number,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
