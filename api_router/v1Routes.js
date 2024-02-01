const express = require("express");
const v1Routes = express.Router();
const chatRoute = require("../App/routes/chatRoute");

v1Routes.get("/test", (req, res) => {
  res.send("Hello, World!");
});

v1Routes.use("/chat", chatRoute);

module.exports = v1Routes;
