const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const countryRouter = require("./routes/countryRoutes");
const languageRouter = require("./routes/languageRoutes");
const { connectMongo, connectToRedis } = require("./utils/db");
const cookieParser = require("cookie-parser");
var morgan = require("morgan");

const passport = require("passport");
require("./utils/passport-config")(passport);

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.use(passport.initialize());

app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/countries", countryRouter);

app.use("/api/v1/languages", languageRouter);

module.exports = app;
