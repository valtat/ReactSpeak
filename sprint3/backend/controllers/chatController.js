require("dotenv").config();
const jwt = require("jsonwebtoken");
const ChatSchema = require("../models/chatSchema");
const mongoose = require("mongoose");

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

  chat
    .use((socket, next) => {
      if (socket.handshake.headers && socket.handshake.headers.authorization) {
        const token = socket.handshake.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
          if (err) return next(new Error("Authentication error"));
          socket.decoded = decoded;
          next();
        });
      } else {
        next(new Error("Authentication error"));
      }
    })
    .on("connection", async (socket) => {
      console.log(`${socket.decoded.username} connected`);

      const spokenLanguage = socket.decoded.spokenLanguage;
      const learningLanguage = socket.decoded.learningLanguage;

      let chatSession = await ChatSchema.findOne({
        $or: [
          { language1: spokenLanguage, language2: learningLanguage },
          { language1: learningLanguage, language2: spokenLanguage },
        ],
        users: { $size: 1 },
        isActive: true,
      });

      if (chatSession) {
        chatSession.users.push(socket.decoded.id);
      } else {
        chatSession = new ChatSchema({
          users: [socket.decoded.id],
          language1: spokenLanguage,
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
        chatSession.messages.push({
          sender: socket.decoded.id,
          text: msg,
        });
        try {
          await chatSession.save();
        } catch (error) {
          console.log(`Failed to save chat session: ${error}`);
        }
        chat.to(socket.chatSessionId).emit("chat message", msg);
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
