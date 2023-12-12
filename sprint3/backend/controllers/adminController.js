const Phrase = require("../models/realLanguageSchema");

// Gets all translations (key-value pairs) of a specific phrase
const getAllTranslations = async (req, res, next) => {
  const { englishMeaning } = req.body;
  try {
    const phrase = await Phrase.findOne({ englishMeaning });
    if (!phrase) {
      const error = new Error("Phrase not found");
      error.statusCode = 404;
      throw error;
    }
    const translations = {
      englishMeaning: phrase.englishMeaning,
      translations: phrase.translations,
    };
    res.status(200).json({ translations });
  } catch (error) {
    next(error);
  }
};

// Gets a translation (key-value pair) in a specific language
const getTranslationInLanguage = async (req, res, next) => {

  const { englishMeaning, language } = req.params;
  try {
    const phrase = await Phrase.findOne({ englishMeaning });
    if (!phrase) {
      const error = new Error("Phrase not found");
      error.statusCode = 404;
      throw error;
    }
    const translation = phrase.translations.get(language);
    if (!translation) {
      const error = new Error(`Translation not found in ${language}`);
      error.statusCode = 404;
      throw error;
    }
    const translationByKey = { [englishMeaning]: translation };
    res.status(200).json(translationByKey);
  } catch (error) {
    next(error);
  }
};

// Adds a new phrase with potential translations (key-value pairs)
const addPhrase = async (req, res, next) => {
  const { englishMeaning, translations } = req.body;
  try {
    const existingPhrase = await Phrase.findOne({
      englishMeaning: englishMeaning,
    });
    if (existingPhrase) {
      const error = new Error("Phrase already exists");
      error.statusCode = 409;
      throw error;
    }
    const phrase = new Phrase({
      englishMeaning: englishMeaning,
      translations: translations,
    });
    await phrase.save();
    res.status(201).json({ message: "Phrase added successfully" });
  } catch (error) {
    next(error);
  }
};

// Adds a translation (key-value pair) to a phrase, has to be an existing phrase
const addTranslation = async (req, res, next) => {
  const { englishMeaning, language, translation } = req.body;
  try {
    const phrase = await Phrase.findOne({ englishMeaning: englishMeaning });
    if (!phrase) {
      const error = new Error("Phrase not found");
      error.statusCode = 404;
      throw error;
    }
    if (phrase.translations.get(language)) {
      const error = new Error("Translation already exists");
      error.statusCode = 409;
      throw error;
    }
    await Phrase.updateOne(
      { englishMeaning: englishMeaning },
      { $set: { [`translations.${language}`]: translation } }
    );
    res.status(201).json({ message: "Translation added successfully" });
  } catch (error) {
    next(error);
  }
};

// Updates a translation (key-value pair) in a phrase
const updateTranslation = async (req, res, next) => {
  const { englishMeaning, language, translation } = req.body;
  try {
    const phrase = await Phrase.findOne({ englishMeaning: englishMeaning });
    if (!phrase) {
      const error = new Error("Phrase not found");
      error.statusCode = 404;
      throw error;
    }
    if (!phrase.translations.get(language)) {
      const error = new Error("Translation not found");
      error.statusCode = 404;
      throw error;
    }
    await Phrase.updateOne(
      { englishMeaning: englishMeaning },
      { $set: { [`translations.${language}`]: translation } }
    );
    res.status(200).json({ message: "Translation updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Deletes a translation (key-value pair) from a phrase, but not the object itself
const deleteTranslation = async (req, res, next) => {
  const { englishMeaning, language } = req.body;
  try {
    const phrase = await Phrase.findOne({ englishMeaning: englishMeaning });
    if (!phrase) {
      const error = new Error("Phrase not found");
      error.statusCode = 404;
      throw error;
    }
    if (!phrase.translations.get(language)) {
      const error = new Error("Translation not found");
      error.statusCode = 404;
      throw error;
    }
    await Phrase.updateOne(
      { englishMeaning: englishMeaning },
      { $unset: { [`translations.${language}`]: 1 } }
    );
    res.status(200).json({ message: "Translation deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Deletes a phrase and all its translations (whole object)
const deletePhrase = async (req, res, next) => {
  const { englishMeaning } = req.body;
  try {
    const phrase = await Phrase.findOne({ englishMeaning: englishMeaning });
    if (!phrase) {
      const error = new Error("Phrase not found");
      error.statusCode = 404;
      throw error;
    }
    await Phrase.deleteOne({ englishMeaning: englishMeaning });
    res.status(200).json({ message: "Phrase deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTranslation,
  addPhrase,
  updateTranslation,
  deleteTranslation,
  deletePhrase,
  getAllTranslations,
  getTranslationInLanguage,
};
