const express = require("express");
const cors = require("cors");
const dummyUserRouter = require("./routes/dummyUserRoutes");
const countryRouter = require("./routes/countryRoutes");
const languageRouter = require("./routes/languageRoutes");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/auth", dummyUserRouter);

app.use("/api/v1/countries", countryRouter);

app.use("/api/v1/languages", languageRouter);

module.exports = app;
