const express = require("express");
const router = express.Router();
const {
  returnQuizResults,
  addQuizResult,
  returnLatestQuizResults,
} = require("../controllers/quizResultController");
const { getRandomPhrases } = require("../controllers/realLanguageController");
const { authJwtAccess } = require("../middleware/authMiddleware");

router.get("/new-quiz", authJwtAccess, getRandomPhrases);

router.get("/", authJwtAccess, returnQuizResults);

router.post("/", authJwtAccess, addQuizResult);

router.get("/latest", authJwtAccess, returnLatestQuizResults);

module.exports = router;
