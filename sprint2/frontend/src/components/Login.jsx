import React, { useState } from "react";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (email && password) {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          //TO DO: Redirect to dashboard or home page
          console.log("Login successful!");
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while logging in");
      }
      
      console.log("Performing login...");
    } else {
      console.log("Please enter email and password.");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register!
      </button>
      <button className="link-btn">Forgot password</button>
    </div>
  );
};
