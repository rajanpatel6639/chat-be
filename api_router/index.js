const express = require("express");
const apiRouter = require("./v1Routes");
const router = express.Router();

router.use("/v1", apiRouter);

module.exports = router;
