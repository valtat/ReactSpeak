import PageLinks from "./PageLinks";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <PageLinks parentClass="nav-links" itemClass="nav-link" />
      </nav>
    </div>
  );
};

export default Navbar;
