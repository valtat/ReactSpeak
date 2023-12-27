require("dotenv").config();
const jwt = require("jsonwebtoken");
const ChatSchema = require("../models/chatSchema");

const verifyChatToken = (socket, next) => {
  if (socket.handshake.headers && socket.handshake.headers.authorization) {
    const token = socket.handshake.headers.authorization.split(" ")[1];
    console.log(`Token: ${token}`);
    jwt.verify(token, process.env.JWT_CHAT_SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
        return next(new Error("Authentication error"));
      }
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
};

module.exports = function (server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      credentials: true,
    },
  });

  const chat = io.of("/chat");

  chat.use(verifyChatToken).on("connection", async (socket) => {
    console.log(`${socket.decoded.username} connected`);

    const spokenLanguage = socket.handshake.query.spokenLanguage;
    const learningLanguage = socket.handshake.query.learningLanguage;

    let chatSession = await ChatSchema.findOne({
      learningLanguage: spokenLanguage,
      spokenLanguage: learningLanguage,
      users: { $size: 1, $ne: socket.decoded.id },
      isActive: true,
    });

    if (chatSession) {
      chatSession.users.push(socket.decoded.id);
    } else {
      chatSession = new ChatSchema({
        users: [socket.decoded.id],
        spokenLanguage: spokenLanguage,
        learningLanguage: learningLanguage,
        isActive: true,
      });
    }

    try {
      await chatSession.save();
    } catch (error) {
      console.log(`Failed to save chat session: ${error}`);
    }

    socket.chatSessionId = chatSession.id;
    socket.join(chatSession.id);

    socket.on("chat message", async (msg) => {
      console.log(`Received message: ${msg}`);

      const message = {
        sender: socket.decoded.id,
        text: msg,
      };

      chatSession.messages.push(message);

      try {
        await chatSession.save();
        message.timestamp = chatSession.updatedAt;
        message.sender = socket.decoded.username;
      } catch (error) {
        console.log(`Failed to save chat session: ${error}`);
      }

      chat.to(socket.chatSessionId).emit("chat message", message);
      console.log(`Message emitted to chat session ${socket.chatSessionId}`);
    });

    socket.emit("joined room", chatSession.id);

    socket.on("disconnect", async () => {
      console.log("User disconnected");
      const chatSession = await ChatSchema.findById(socket.chatSessionId);
      if (chatSession) {
        if (
          chatSession.messages.length === 0 ||
          chatSession.users.length === 1
        ) {
          await ChatSchema.deleteOne({ _id: socket.chatSessionId });
        } else {
          chatSession.isActive = false;
          await chatSession.save();
        }
      }
    });
  });
};
