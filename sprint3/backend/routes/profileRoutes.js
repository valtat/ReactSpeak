const express = require("express");
const router = express.Router();
const { returnProfile } = require("../controllers/profileController");
const { updateDefaultLanguage } = require("../controllers/profileController");

router.get("/", returnProfile);
router.put("/defaultLanguage", updateDefaultLanguage);

module.exports = router;
