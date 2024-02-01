const express = require("express");
const chatRoute = express.Router();
const sendMsg = require("../controller/sendMsg");

// chatRoute.post("/send", sendMsg);

module.exports = chatRoute;
