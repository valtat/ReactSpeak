import { useState, useEffect, useRef, useContext } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthStateContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { loading, error } = useContext(AuthStateContext);

  const navigate = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    emailRef.current.focus(); // focus on email input on render
  }, []);

  useEffect(() => {
    setErrMsg(""); // clear error message on input change
  }, [email, password]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const userLogin = { email, password };
    const success = await login(userLogin);
    if (success) {
      navigate("/dashboard");
    } else if (error) {
      setErrMsg(error);
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
            ref={emailRef}
            autoComplete="email"
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
          <button className="submit-button" type="submit" disabled={loading}>
            Log in
          </button>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"} // hide error message when empty
            aria-live="assertive" // announce changes to error message
          >
            {errMsg}
          </p>
        </form>
        <Link to="/register" className="link-btn">
          Don&apos;t have an account? Register!
        </Link>
        <Link to="/forgot-password" className="link-btn">
          Forgot password
        </Link>
      </div>
    </div>
  );
};
