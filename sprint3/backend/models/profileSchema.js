const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
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

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
