import { useState, useEffect, useRef } from "react";
import { initializeSocket } from "./socket";
import authService from "../../services/authService";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const spokenLanguage = "English";
  const learningLanguage = "Spanish";
  const socketRef = useRef();

  useEffect(() => {
    const createChatToken = async () => {
      console.log("Creating chat token");
      const response = await authService.createChatToken();
      if (response.status === 200) {
        const chatToken = response.data.chat_token;
        localStorage.setItem("chat_token", chatToken);
        console.log("Chat token is ", localStorage.chat_token);
        socketRef.current = initializeSocket(spokenLanguage, learningLanguage);

        socketRef.current.on("connect", () => {
          console.log("Connected to the server");
        });

        socketRef.current.on("chat message", (msg) => {
          console.log(msg);
          let message = msg.timestamp + " : " + msg.sender + " : " + msg.text;
          setChat((prevChat) => [...prevChat, message]);
        });

        socketRef.current.on("connect_error", (err) => {
          console.log(err.message);
        });

        socketRef.current.on("joined room", (roomId) => {
          console.log("Joined room", roomId);
        });
      }
    };

    createChatToken();

    return () => {
      console.log("Disconnecting from the server");
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    socketRef.current.emit("chat message", message);
    setMessage("");
  };

  return (
    <div>
      <ul id="messages">
        {chat.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          id="m"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
