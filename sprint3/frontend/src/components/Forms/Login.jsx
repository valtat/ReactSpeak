import { useState, useEffect, useRef, useContext } from "react";
import AuthContext  from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService.js";
import "./Login.css";

export const Login = (props) => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    emailRef.current.focus(); // focus on email input on render
  }, []);

  useEffect(() => {
    setErrMsg("");  // clear error message on input change
  }, [email, password]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const data = await userService.login(email, password);
      console.log(data);
      if (data.status !== "success") {
        setErrMsg(data.message);
      } else {
        
        setAuth({ name: data.name, email: data.email, role: data.role, token: data.token }); 
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      }
    } catch (err) {
      setErrMsg(err.message);
    }
    errRef.current.focus();
  };

  return (
    <div className="parent-container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"} // hide error message when empty
        aria-live="assertive" // announce changes to error message
      >
        {errMsg}
      </p>
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
          <button className="submit-button" type="submit">
            Log in
          </button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("register")}
        >
          Don&apos;t have an account? Register!
        </button>
        <button className="link-btn">Forgot password</button>
      </div>
    </div>
  );
};
