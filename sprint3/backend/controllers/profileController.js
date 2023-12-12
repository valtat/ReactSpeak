const Profile = require("../models/profileSchema");

const returnProfile = async (req, res) => {
  const { userId } = req.params;
  const profile = await Profile.findOne({ user: userId });
  res.status(200).json(profile);
};

const updateDefaultLanguage = async (req, res) => {
  const { userId, language } = req.body;

  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.defaultLanguage = language;
    await profile.save();

    res.status(200).json({ message: "Default language updated successfully" });
  } catch (error) {
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
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  returnProfile,
  updateDefaultLanguage,
  addQuizResult,
  getWeeklyQuizResults,
};
