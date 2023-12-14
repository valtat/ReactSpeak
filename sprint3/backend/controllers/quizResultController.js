const QuizResult = require("../models/quizResultSchema");
const mongoose = require("mongoose");

const returnQuizResults = async (req, res) => {
  const user = req.user;
  const quizResults = await QuizResult.find({
    user: user._id,
  });
  res.status(200).json(quizResults);
};

const addQuizResult = async (req, res) => {
  const user = req.user;
  const { language, maxScore, score, duration } = req.body;
  try {
    const quizResult = new QuizResult({
      user: user._id,
      language,
      maxScore,
      score,
      duration,
    });
    await quizResult.save();

    res.status(200).json({ message: "Quiz result added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const returnLatestQuizResults = async (req, res) => {
  const user = req.user;

  try {
    const languagesStudied = await QuizResult.distinct("language", {
      user: user._id,
    });

    const latestQuizResults = await Promise.all(
      languagesStudied.map(async (language) => {
        return await QuizResult.findOne({ user: user._id, language })
          .sort("-date")
          .exec();
      })
    );

    res.status(200).json(latestQuizResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  returnQuizResults,
  addQuizResult,
  returnLatestQuizResults,
};
