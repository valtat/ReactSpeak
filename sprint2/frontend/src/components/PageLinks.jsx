import { Link } from "react-router-dom";
import Button from "./Button";

const PageLinks = (props) => {
  return (
    <ul>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Link to="/">Home</Link>
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Link to="/courses">Courses</Link>
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Link to="/users">Users</Link>
      </li>
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
    </ul>
  );
};
export default PageLinks;
