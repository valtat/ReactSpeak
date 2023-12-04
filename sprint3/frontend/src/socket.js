import { io } from "socket.io-client";

const URL = "http://localhost:4000";
const yourJwtToken = localStorage.getItem("yourJwtTokenKey");
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
