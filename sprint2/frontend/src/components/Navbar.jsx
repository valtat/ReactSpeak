import classes from "../assets/css/Navbar.module.css";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

const Navbar = () => {
  return (
    <nav className={classes.Navbar}>
      <MobileNavigation />
      <Navigation />
    </nav>
  );
};

export default Navbar;
