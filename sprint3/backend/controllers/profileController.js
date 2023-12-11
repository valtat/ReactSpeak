const profileModel = require("../models/dummyProfileModel");

const returnProfile = (req, res) => {
  const profile = profileModel.returnProfile();
  res.status(200).json(profile);
};

module.exports = {
  returnProfile,
};
