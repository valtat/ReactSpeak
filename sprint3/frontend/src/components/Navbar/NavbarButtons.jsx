import { Link } from "react-router-dom";
import Button from "./Button";
import { useContext, useState } from "react";
import AuthContext from "../../context/Auth";
import classes from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

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
            <Button name={`hi, ${username}`} className={classes.dropdownbtn}/>
            <FontAwesomeIcon icon={faCaretDown} className={classes.icon} />
            <div className={classes.dropdownContent}>
            <li
                onClick={() => {
                  props.isMobile && props.closeMobileMenu();
                }}
              >
                <Link to="/dashboard">
                  <Button name="Profile" />
                </Link>
              </li>
              <li
                onClick={() => {
                  props.isMobile && props.closeMobileMenu();
                }}
              >
                <Link to="/dashboard">
                  <Button name="Dashboard" />
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
               <li
               className={classes.logout}
                onClick={() => {
                  props.isMobile && props.closeMobileMenu();
                  logout()
                  
                }}
              >
                 <FontAwesomeIcon icon={faSignOutAlt} className={classes.icon} />
                <Button name="Log out" />
               
              </li>
            </div>
          </div>
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
export default NavbarButtons;
