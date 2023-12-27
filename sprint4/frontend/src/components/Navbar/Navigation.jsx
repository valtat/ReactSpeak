import classes from "./Navbar.module.css";
import NavbarButtons from "./NavbarButtons";
import PageLinks from "./PageLinks";

const Navigation = () => {
  return (
    <nav className={classes.Navigation}>
      <PageLinks />
      <NavbarButtons />
    </nav>
  );
};

export default Navigation;
