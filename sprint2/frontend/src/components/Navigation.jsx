import classes from "../assets/css/Navbar.module.css";
import PageLinks from "./PageLinks";

const Navigation = () => {
  return (
    <nav className={classes.Navigation}>
      <PageLinks />
    </nav>
  );
};

export default Navigation;
