const express = require("express");
const router = express.Router();
const languageController = require("../controllers/languageController");

router.get("/:language", languageController.getLanguage);

router.post("/", languageController.addNewPhrase);

module.exports = router;
