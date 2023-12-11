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

module.exports = {
  returnProfile,
  updateDefaultLanguage,
};
