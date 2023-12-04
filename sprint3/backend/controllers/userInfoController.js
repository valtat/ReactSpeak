const userInfoModel = require("../models/dummyUserInfoModel");

const returnAllUserInfo = (req, res) => {
  const userInfo = userInfoModel.returnAllUserInfo();
  res.status(200).json(userInfo);
};

module.exports = {
  returnAllUserInfo,
};
