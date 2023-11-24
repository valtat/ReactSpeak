import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userService from "../../services/userService.js";
import "./Login.css";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (email && password) {
      try {
        await userService.login(email, password);
        navigate("/dashboard");
        console.log("Login successful!");
      } catch (error) {
        alert(error.message);
      }
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
          <button className="submit-button" type="submit">
            Log in
          </button>
        </form>
        <Link to="/register" className="link-btn">
          Don't have an account? Register!
        </Link>
        <Link to="/forgot-password" className="link-btn">
          Forgot password
        </Link>
      </div>
    </div>
  );
};
