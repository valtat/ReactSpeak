const Phrase = require("../models/realLanguageSchema");
const _ = require("lodash");

// Gets a random number of phrases and their translations, follows the model setup in the dummy data
const getRandomPhrases = async (req, res, next) => {
  const { number, language } = req.body;
  try {
    const phrases = await Phrase.aggregate([
      { $sample: { size: parseInt(number) } },
    ]);
    const allPhrases = await Phrase.find();
    const translations = phrases.map((phrase) => {
      const correctTranslation = phrase.translations[language];
      const incorrectPhrases = allPhrases.filter(
        (p) => p.englishMeaning !== phrase.englishMeaning
      );
      const sampledIncorrectPhrases = _.sampleSize(incorrectPhrases, 3);
      const incorrectTranslations = sampledIncorrectPhrases.map((p) =>
        p.translations.get(language)
      );
      return {
        phrase: phrase.englishMeaning,
        translations: [correctTranslation, ...incorrectTranslations],
        correctTranslation: correctTranslation,
      };
    });
    res.status(200).json({ translations });
  } catch (error) {
    next(error);
  }
};

// Gets all phrases and their translations
const getAllPhrases = async (req, res, next) => {
  try {
    const phrases = await Phrase.find();
    const allTranslations = phrases.map((phrase) => {
      return {
        englishMeaning: phrase.englishMeaning,
        translations: phrase.translations,
      };
    });
    res.status(200).json({ allTranslations });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRandomPhrases,
  getAllPhrases,
};
