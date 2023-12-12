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

module.exports = {
  returnProfile,
  updateDefaultLanguage,
};
