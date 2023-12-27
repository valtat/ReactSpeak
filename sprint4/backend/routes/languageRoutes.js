const express = require("express");
const router = express.Router();
const languageController = require("../controllers/realLanguageController");

router.get("/", languageController.getRandomPhrases);

router.get("/all", languageController.getAllPhrases);

module.exports = router;
