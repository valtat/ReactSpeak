import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/Auth";
import classes from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const NavbarButtons = (props) => {
  const { isLogged, logout, username, role } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <ul className={classes.navbarButtons}>
      {isLogged ? (
        <>
          <div
            className={`${classes.dropdown} ${isOpen ? classes.open : ""}`}
            onClick={toggleOpen}
          >
            <button className={classes.dropdownbtn}>
              {`hi, ${username}`}
              <FontAwesomeIcon icon={faCaretDown} className={classes.icon} />
            </button>

            <div className={classes.dropdownContent}>
              <li
                onClick={() => {
                  props.isMobile && props.closeMobileMenu();
                }}
              >
                <Link to="/dashboard">
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
                  <Link to="/">
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
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className={classes.icon}
                  />
                  Log out
                </button>
              </li>
            </div>
          </div>
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
export default NavbarButtons;
