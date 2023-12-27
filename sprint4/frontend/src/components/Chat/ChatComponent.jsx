import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import classes from "./Chat.module.css";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const spokenLanguage = "English";
  const learningLanguage = "Spanish";
  const socketRef = useRef();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    socketRef.current = io("localhost:3012/chat", {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      query: {
        spokenLanguage,
        learningLanguage,
      },
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to the server");
    });

    socketRef.current.on("chat message", (msg) => {
      console.log(msg);
      setChat((prevChat) => [...prevChat, msg]);
    });

    socketRef.current.on("joined room", (roomId) => {
      console.log("Joined room", roomId);
      setRoomId(roomId);
    });

    socketRef.current.on("connect_error", (err) => {
      console.log(err.message);
    });

    socketRef.current.on("token expired", async () => {
      try {
        const response = await fetch("/api/refresh_token", {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Refresh token failed");
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.accessToken);

        socketRef.current.connect();
      } catch (err) {
        console.error(err);
      }
    });

    return () => {
      console.log("Disconnecting from the server");
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(socketRef.current.id);
    socketRef.current.emit("chat message", message);
    setMessage("");
  };

  return (
  
    <div className={classes.Chat}>
      <ChatBody chat={chat}/>
      <ChatFooter sendMessage={sendMessage} message={message} setMessage={setMessage}/>
    </div>
  

      /* <div>
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form> */
   
  );
};

export default ChatComponent;
