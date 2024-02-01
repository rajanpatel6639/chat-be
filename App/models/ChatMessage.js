const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatMessageSchema = new Schema({
  message: { type: String },
  reply: { type: String },
});

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);
