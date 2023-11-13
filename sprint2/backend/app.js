const express = require("express");
const cors = require("cors");
const dummyUserRouter = require("./routes/dummyUserRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/auth", dummyUserRouter);

module.exports = app;
