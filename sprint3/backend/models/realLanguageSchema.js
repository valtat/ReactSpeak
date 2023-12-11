const mongoose = require("mongoose");

const PhraseSchema = new mongoose.Schema({
  englishMeaning: String,
  translations: {
    type: Map,
    of: String,
  },
});

module.exports = mongoose.model("Phrase", PhraseSchema);
