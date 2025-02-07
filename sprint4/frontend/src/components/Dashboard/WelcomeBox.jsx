import { useContext } from "react";
import { AuthStateContext } from "../../context/AuthContext";
import img from "../../assets/images/woman.png";

const WelcomeBox = () => {
  const { username } = useContext(AuthStateContext);
  return (
    <div className="welcomebox">
      <div className="welcome-text">
        <h1>Welcome, {username}!</h1>
        <section>
          <p>Here you can find all the courses you are enrolled in.</p>
          <p>Keep practicing and improve your results!</p>
        </section>
      </div>

      <div className="image">
        {" "}
        <img src={img} alt="Welcome" />
      </div>
    </div>
  );
};

export default WelcomeBox;
