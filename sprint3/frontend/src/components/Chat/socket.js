import { io } from "socket.io-client";

export const initializeSocket = (spokenLanguage, learningLanguage) => {
  const chatToken = localStorage.getItem("chat_token");
  const socket = io("/chat", {
    autoConnect: true,
    extraHeaders: {
      Authorization: `Bearer ${chatToken}`,
    },
    query: {
      spokenLanguage,
      learningLanguage,
    },
  });

  return socket;
};
