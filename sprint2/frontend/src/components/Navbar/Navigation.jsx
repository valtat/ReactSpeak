import classes from "./Navbar.module.css";
import PageLinks from "./PageLinks";

const Navigation = () => {
  return (
    <nav className={classes.Navigation}>
      <PageLinks />
    </nav>
  );
};

export default Navigation;
