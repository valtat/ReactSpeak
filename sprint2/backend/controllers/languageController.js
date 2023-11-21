const languageData = require("../models/dummyLanguageModel");
const Language = require("../models/languageSchema");

// Uses DUMMY DATA, refactor.
const getLanguage = async (req, res) => {
  try {
    console.log(req.params.language);
    const languages = await languageData.getLanguageData(req.params.language);
    if (languages) {
      res.status(200).json({
        status: "success",
        data: {
          languages,
        },
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Language not found",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addNewPhrase = async (req, res) => {
  const { language, phrase, translation } = req.body;
  try {
    let languageDoc = await Language.findOne({ language });

    if (!languageDoc) {
      languageDoc = new Language({ language });
    }

    languageDoc.phrases.push({ phrase, translation });

    const savedLanguage = await languageDoc.save();
    res.json(savedLanguage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getLanguage, addNewPhrase };
