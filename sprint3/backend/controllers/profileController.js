const Profile = require("../models/profileSchema");
const mongoose = require("mongoose");

const returnProfile = async (req, res) => {
  const user = req.user;
  const profile = await Profile.findOne({
    user: user._id,
  });
  res.status(200).json(profile);
};

const updateDefaultLanguage = async (req, res) => {
  const user = req.user;
  const { language } = req.body;

  try {
    const profile = await Profile.findOne({
      user: user._id,
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.defaultLanguage = language;
    await profile.save();

    res.status(200).json({ message: "Default language updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addLanguageStudied = async (req, res) => {
  const user = req.user;
  const { language } = req.body;

  try {
    const profile = await Profile.findOne({
      user: user._id,
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (!profile.languagesStudied.includes(language)) {
      profile.languagesStudied = [
        ...new Set([...profile.languagesStudied, language]),
      ];
      await profile.save();
    }

    res
      .status(200)
      .json({ message: "Language added to studied languages successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getWeeklyQuizResults = async (req, res) => {
  const userId = req.user.id;
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const result = await Profile.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      { $unwind: "$quizzes" },
      { $match: { "quizzes.quizDate": { $gte: oneWeekAgo } } },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$quizzes.quizDate" },
            },
            language: "$quizzes.language",
          },
          total: { $sum: "$quizzes.timeSpent" },
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const data = days.map((day) => ({ name: day, JP: 0, FI: 0, amt: 100 }));

    result.forEach(({ _id, total }) => {
      const date = new Date(_id.date);
      const dayIndex = (date.getDay() + 6) % 7; // Adjust the day index so that 0 corresponds to Monday
      const day = days[dayIndex];
      const language = _id.language;

      const dayData = data.find((d) => d.name === day);
      if (dayData) {
        dayData[language] = total;
      }
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addQuizResult = async (req, res) => {
  const userId = req.user.id;
  const { quizResult } = req.body;

  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.quizzes.push(quizResult);
    await profile.save();

    res.status(200).json({ message: "Quiz result added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProgressByLanguage = async (req, res) => {
  const { language, sentencesLearned } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (!profile.progressByLanguage) {
      profile.progressByLanguage = new Map();
    }

    const currentProgress = profile.progressByLanguage.get(language) || 0;
    profile.progressByLanguage.set(
      language,
      currentProgress + sentencesLearned
    );
    profile.sentencesLearned += sentencesLearned;

    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  returnProfile,
  updateDefaultLanguage,
  addQuizResult,
  getWeeklyQuizResults,
  addLanguageStudied,
  updateProgressByLanguage,
};
