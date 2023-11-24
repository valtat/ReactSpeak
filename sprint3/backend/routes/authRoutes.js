const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  registerUser,
  loginUser,
  getAllUsers,
  refreshAccessToken,
  refreshSession,
} = require("../controllers/authController");
const {
  adminAuth,
  userAuth,
  localAuth,
  jwtAuth,
  refreshAuth,
} = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", localAuth, loginUser);

router.post("/refresh-token", refreshAuth, refreshAccessToken);

router.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You are logged in as " + req.user.username);
  }
);

module.exports = router;
