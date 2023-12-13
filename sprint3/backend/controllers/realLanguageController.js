const Phrase = require("../models/realLanguageSchema");
const _ = require("lodash");

// Gets a random number of phrases and their translations, follows the model setup in the dummy data
const getRandomPhrases = async (req, res, next) => {
  const { number, language } = req.query;
  try {
    const allPhrases = await Phrase.find();
    const phrasesWithTranslation = allPhrases.filter(
      (phrase) => phrase.translations.get(language) !== undefined
    );
    const phrases = _.sampleSize(phrasesWithTranslation, parseInt(number));
    const translations = phrases.map((phrase) => {
      const correctTranslation = phrase.translations.get(language); // Change this line
      const incorrectPhrases = phrasesWithTranslation.filter(
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
