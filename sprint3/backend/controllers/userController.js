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

const login = (req, res) => {
  const loggedInUser = user.login(req.body.email, req.body.password);
  if (loggedInUser) {
    res.status(200).json({
      status: "success",
      message: "Login successful",
      name: loggedInUser.name,
      email: loggedInUser.email,
      token: loggedInUser.token,
      role: loggedInUser.role,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Invalid email or password",
    });
  }
  console.log("logged in user: ", loggedInUser);
};

module.exports = { forgotPassword, login};
