import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useRegister } from "../../hooks/useRegister";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { handleRegister, error, loading } = useRegister();

  const navigate = useNavigate();
  const usernameRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    usernameRef.current.focus(); // focus on username input on render
  }, []);

  useEffect(() => {
    setErrMsg(""); // clear error message on input change
  }, [username, email, password]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const userRegister = { username, email, password, confirmPassword };
    const error = await handleRegister(userRegister);

    if (error) {
      setErrMsg(error);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="parent-container">
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="name">username</label>
          <input
            value={username}
            ref={usernameRef}
            autoComplete="username"
            type="text"
            name="name"
            id="name"
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="******"
            id="password"
            name="password"
            required
          />
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="******"
            id="confirmPassword"
            name="confirmPassword"
            required
          />

          <button className="submit-button" type="submit" disabled={loading}>
            Register
          </button>
          <div
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"} // hide error message when empty
            aria-live="assertive" // announce changes to error message
          >
            {loading ? <p>Loading...</p> : errMsg && <p>{errMsg}</p>}
          </div>
        </form>
        <Link to="/login" className="link-btn">
          Already have an account? Login!
        </Link>
        <Link to="/forgot-password" className="link-btn">
          Forgot password
        </Link>
      </div>
    </div>
  );
};
