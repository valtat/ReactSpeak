import { io } from "socket.io-client";

const URL = "http://localhost:3012";
const yourJwtToken = localStorage.getItem("access_token");
const spokenLanguage = "English";
const learningLanguage = "Spanish";

export const socket = io(URL, {
  autoConnect: false,
  path: "/chat",
  extraHeaders: {
    Authorization: `Bearer ${yourJwtToken}`,
  },
  query: {
    spokenLanguage,
    learningLanguage,
  },
});
