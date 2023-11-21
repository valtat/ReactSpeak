const mongoose = require("mongoose");

const phraseSchema = new mongoose.Schema({
  phrase: {
    type: String,
    required: true,
  },
  translation: {
    type: String,
    required: true,
  },
});

module.exports = phraseSchema;
