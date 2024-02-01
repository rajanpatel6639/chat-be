const mongoose = require("mongoose");
const db = require("../config");
const ChatMessage = require("../App/models/ChatMessage");

const res = async () => {
  await mongoose.connect(db.database, {});
  const data = [
    {
      message: "hi",
      reply: "hello",
    },
    {
      message: "how are you",
      reply: "I'm fine, what about you!!",
    },
  ];

  try {
    await ChatMessage.deleteMany();
    const res = await ChatMessage.insertMany(data);
    if (!res) throw new Error("Failed to add data");
    mongoose.disconnect();
    return res;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

res()
  .then((data) =>
    data ? console.log(`Created default data: ${data}`) : undefined
  )
  .then(() => process.exit(0))
  .catch((err) => (console.error(err), process.exit(1)));
