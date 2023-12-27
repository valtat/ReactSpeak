import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/Auth";
import classes from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const MobileNavbarButtons = (props) => {
  const { isLogged, logout, role } = useContext(AuthContext);

  return (
    <ul className={classes.navbarButtons}>
      {isLogged ? (
        <>
          <li
            onClick={() => {
              props.isMobile && props.closeMobileMenu();
            }}
          >
            <Link to="/profile">
              <button>Profile</button>
            </Link>
          </li>
          <li
            onClick={() => {
              props.isMobile && props.closeMobileMenu();
            }}
          >
            <Link to="/dashboard">
              <button>Dashboard</button>
            </Link>
          </li>
          {role === "admin" && (
            <li
              onClick={() => {
                props.isMobile && props.closeMobileMenu();
              }}
            >
              <Link to="/admin">
                <button>Admin tools</button>
              </Link>
            </li>
          )}
          <li
            className={classes.logout}
            onClick={() => {
              props.isMobile && props.closeMobileMenu();
              logout();
            }}
          >
            <button>
              <FontAwesomeIcon icon={faSignOutAlt} className={classes.icon} />
              Log out
            </button>
          </li>
        </>
      ) : (
        <>
          <li onClick={() => props.isMobile && props.closeMobileMenu()}>
            <Link to="/login">
              <button>Log in</button>
            </Link>
          </li>
          <li onClick={() => props.isMobile && props.closeMobileMenu()}>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default MobileNavbarButtons;
