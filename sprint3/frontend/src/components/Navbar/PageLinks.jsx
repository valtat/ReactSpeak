import { Link } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PageLinks = (props) => {
  const { isLogged, logout, username, role } = useContext(AuthContext);

  return (
    <ul>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Link to="/">Home</Link>
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Link to="/countries">Courses</Link>
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Link to="/users">Users</Link>
      </li>
      {isLogged ? (
        <>
          <li
            onClick={() => {
              props.isMobile && props.closeMobileMenu();
              logout();
            }}
          >
            <Button name="Log out" />
          </li>
          <li
            onClick={() => {
              props.isMobile && props.closeMobileMenu();
            }}
          >
            <Link to="/dashboard">
              <Button name={`Hi, ${username}!`} />
            </Link>
          </li>
          {role === "admin" && (
            <li
              onClick={() => {
                props.isMobile && props.closeMobileMenu();
              }}
            >
              <Link to="/">
                <Button name="Admin tools" />
              </Link>
            </li>
          )}
        </>
      ) : (
        <>
          <li onClick={() => props.isMobile && props.closeMobileMenu()}>
            <Link to="/login">
              <Button name="Log in" />
            </Link>
          </li>
          <li onClick={() => props.isMobile && props.closeMobileMenu()}>
            <Link to="/register">
              <Button name="Register" />
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};
export default PageLinks;
