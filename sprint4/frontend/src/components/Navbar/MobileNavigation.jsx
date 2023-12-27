
import MobileNavbarButtons from "./MobileNavbarButtons";
import classes from "./Navbar.module.css";
import PageLinks from "./PageLinks";
import { useState } from "react";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  const burgerIcon = (
    <i
      className={`fas fa-bars ${classes.Burger}`}
      onClick={() => setOpen(!open)}
    />
  );
  const closeIcon = (
    <i
      className={`fas fa-times ${classes.Burger}`}
      onClick={() => setOpen(!open)}
    />
  );

  const closeMobileMenu = () => setOpen(false);

  return (
    <nav className={classes.MobileNavigation}>
      {open ? closeIcon : burgerIcon}

      {open && 
      <div className={classes.linkslist}>
      <PageLinks isMobile={true} closeMobileMenu={closeMobileMenu} />
      <MobileNavbarButtons isMobile={true} closeMobileMenu={closeMobileMenu} />
      </div>
      }
    </nav>
  );
};

export default MobileNavigation;
