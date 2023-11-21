import { useState } from "react";
import userService from "../../services/userService.js";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await userService.forgotPassword(email);
      console.log("Email for resetting password sent!");
      // TO DO: Show success message or redirect to login page
      navigate("/reset-password");
    } catch (error) {
      console.error(error);
      setError("An error occurred while resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parent-container">
      <div className="auth-form-container">
        <h2>Forgot Password</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
