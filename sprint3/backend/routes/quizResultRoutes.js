const express = require("express");
const router = express.Router();
const {
  returnQuizResults,
  addQuizResult,
  returnLatestQuizResults,
} = require("../controllers/quizResultController");
const { jwtAuth } = require("../middleware/authMiddleware");

router.get("/", jwtAuth, returnQuizResults);
router.post("/", jwtAuth, addQuizResult);
router.get("/latest", jwtAuth, returnLatestQuizResults);

module.exports = router;
