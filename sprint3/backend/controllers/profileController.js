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

const updateProgressByLanguage = async (req, res) => {
  const { language, sentencesLearned } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
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
  addLanguageStudied,
  updateProgressByLanguage,
};
