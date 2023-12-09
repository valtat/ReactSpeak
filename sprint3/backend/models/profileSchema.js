const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  registrationDate: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: String,
    required: true,
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
  /* profileComments: {
    type: Array,
  }, */
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
