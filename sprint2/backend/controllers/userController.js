const users = require("../models/dummyUserData");

exports.forgotPassword = (req, res) => {
  if (users.forgotPassword(req.body.email)) {
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
