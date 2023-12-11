const express = require("express");
const router = express.Router();
const { returnProfile } = require("../controllers/profileController");

router.get("/", returnProfile);

module.exports = router;
