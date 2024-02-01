const ChatMessage = require("../App/models/ChatMessage");

function socketInitialize(io) {
  const socketMap = new Map();
  io.on("connection", (socket) => {
    console.log("Socket Connected");
    socketMap.set(socket.id, socket);
    socket.on("message", (data) => {
      console.log("socket recv", data);
      sendMsg(data);
    });
    socket.on("disconnect", () => {
      socketMap.delete(socket.id);
      console.log(`Socket disconnected`);
    });
  });
  // Expose the socket map
  socketInitialize.socketMap = socketMap;
}
function emitData(event, value) {
  const { socketMap } = socketInitialize;
  socketMap.forEach((socket) => {
    socket.emit(event, value);
  });
}

async function sendMsg(data) {
  console.log("send");
  const { message } = data;
  try {
    const res = await ChatMessage.find({ message });
    console.log("db res", res);
    if (res.length > 0) {
      emitData("message", { data: res[0].reply });
    } else {
      emitData("message", { data: "no answer for this quition !!" });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  socketInitialize,
  emitData,
};
