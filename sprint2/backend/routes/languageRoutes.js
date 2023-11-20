const express = require("express");
const router = express.Router();
const languageController = require("../controllers/languageController");

router.get("/:language", languageController.getLanguage);

module.exports = router;
