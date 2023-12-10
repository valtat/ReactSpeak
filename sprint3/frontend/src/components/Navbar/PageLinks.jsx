import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const PageLinks = (props) => {

  return (
    <ul className={classes.pageLinks}>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Link to="/">Home</Link>
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Link to="/countries">Countries</Link>
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Link to="/chat">Chat</Link>
      </li>
    </ul>
  );
};
export default PageLinks;
