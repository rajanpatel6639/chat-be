const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");

const router = require("./api_router");
const config = require("./config");
const socket = require("./sockets");

const whileList = ["http://localhost:3000"];

const corsOptions = {
  origin(origin, cb) {
    if (!origin || whileList.indexOf(origin) !== -1) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  credential: true,
};

const initServer = () => {
  let server = express();

  const createServer = async (config) => {
    try {
      mongoose.set("strictQuery", true);
      console.log(`Attempting to connect to the database ${config.database}`);
      await mongoose.connect(config.database, {});
      console.log("Successfully Connected to the database");
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to connect to database ${config.database}`);
    }

    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);

    server.use(cors(corsOptions));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(logger("dev"));

    server.use("/api", router);
  };

  const startServer = async () => {
    const hostname = server.get("hostname");
    const port = server.get("port");
    const expressServer = await server.listen(port);
    console.log(`Server listening on - http://${hostname}:${port}`);

    io = require("socket.io")(expressServer, {
      cors: true,
    });
    socket.socketInitialize(io);

    return expressServer;
  };

  return { createServer, startServer };
};

const res = initServer();
res
  .createServer(config)
  .then((res) => console.log(`Initialization Successful`))
  .then((r) => res.startServer());
