const mongoose = require("mongoose");
const phraseSchema = require("./phraseSchema");

const languageSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    unique: true,
  },
  phrases: [phraseSchema],
});

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;
