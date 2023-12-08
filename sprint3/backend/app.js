const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const http = require("http");

const errorMiddleware = require("./middleware/errorMiddleware");

const authRouter = require("./routes/authRoutes");
const countryRouter = require("./routes/countryRoutes");
const languageRouter = require("./routes/languageRoutes");

require("./utils/db");
require("./utils/passport-config");

const app = express();
const server = http.createServer(app);

const chat = require("./controllers/chatController");

chat(server);

app.use(passport.initialize());
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/countries", countryRouter);

app.use("/api/v1/languages", languageRouter);

app.use(errorMiddleware);

module.exports = server;
