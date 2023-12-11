import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/Auth";
import classes from "./ChatHome.module.css";

const ChatHome = () => {
  const navigate = useNavigate();
  const { username, isLogged } = useContext(AuthContext);

  const [spokenLanguage, setSpokenLanguage] = useState("");
  const [learningLanguage, setLearningLanguage] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/chat");
  };
  
  return (
    <div className={classes.ChatHome}>
      {!isLogged ? (
        <>
          <p>Log in to start chatting!</p>
          <button onClick={() => navigate("/login")}>Log in</button>
        </>
      ) : (
        <div className={classes.container}>
          <h1>Ready to chat, {username}?</h1>
          <h3>
          Boost your language skills by chatting with locals! Pick your language and start your learning journey.
          </h3>
        <section className={classes.languages}>
          <label>
            Your language
            <select
              value={spokenLanguage}
              onChange={(e) => setSpokenLanguage(e.target.value)}
            >
              <option value="english">English</option>
            </select>
          </label>
          <label>
            Language to boost
            <select
              value={learningLanguage}
              onChange={(e) => setLearningLanguage(e.target.value)}
            >
              <option value="finnish">Finnish</option>
              <option value="swedish">Swedish</option>
              <option value="french">French</option>
              <option value="russian">Russian</option>
              <option value="italian">Italian</option>
              <option value="japanese">Japanese</option>
              <option value="polish">Polish</option>
            </select>
          </label>
        </section>

          <button onClick={handleClick}>Start chatting!</button>

        </div>
      )}
    </div>
  );
};

export default ChatHome;