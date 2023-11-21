import { useState } from "react";
import userService from "../../services/userService";
import "./Login.css";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await userService.forgotPassword({ password });
      //TO DO: Redirect to dashboard or home page
      console.log("Password reset successful!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while resetting password");
    }
  };

  return (
    <div className="parent-container">
      <div className="auth-form-container">
      <h2>Reset Password</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="password">New Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="******"
          id="password"
          name="password"
        />
        <label htmlFor="confirmPassword">Re-Type Password</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="******"
          id="confirmPassword"
          name="confirmPassword"
        />
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};
