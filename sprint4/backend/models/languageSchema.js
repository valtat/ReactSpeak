const mongoose = require("mongoose");
const phraseSchema = require("./phraseSchema");

const languageSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    unique: true,
  },
  phrases: [phraseSchema],
  flag: {
    type: String,
    required: true,
  },
});

// const Language = mongoose.model("Language", languageSchema);

module.exports = languageSchema;
