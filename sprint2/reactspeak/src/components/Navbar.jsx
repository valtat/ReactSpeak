import PageLinks from "./PageLinks";

const Navbar = () => {
  return (
    <nav className="navbar">
      <PageLinks parentClass="nav-links" itemClass="nav-link" />
    </nav>
  );
};

export default Navbar;
