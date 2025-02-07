const user = require("../models/dummyUserData");

const forgotPassword = (req, res) => {
  if (user.forgotPassword(req.body.email)) {
    res.status(200).json({
      status: "success",
      message: "Email sent",
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Email not found",
    });
  }
};

module.exports = { forgotPassword };
