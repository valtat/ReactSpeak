import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService.js";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (email && password) {
      userService
        .login(email, password)
        .then((response) => {
          navigate("/dashboard");
          console.log("Login successful!");
        })
        .catch((error) => {
          alert(error.message);
        });
      console.log("Performing login...");
    } else {
      console.log("Please enter email and password.");
    }
  };

  return (
    <div className="parent-container">
    <div className="auth-form-container">
      <h2>Log in</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="******"
          id="password"
          name="password"
        />
        <button className="submit-button" type="submit">Log in</button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register!
      </button>
      <button className="link-btn">Forgot password</button>
    </div>
    </div>
  );
};
