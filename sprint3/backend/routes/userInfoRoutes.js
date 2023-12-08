const express = require("express");
const router = express.Router();
const { returnAllUserInfo } = require("../controllers/userInfoController");

router.get("/", returnAllUserInfo);

module.exports = router;
