module.exports = {
  env: process.env.NODE_ENV || "local",
  secret: "abcdefg",
  database: "mongodb://127.0.0.1:27017/chat",
  hostname: "localhost",
  port: 3030,
};
