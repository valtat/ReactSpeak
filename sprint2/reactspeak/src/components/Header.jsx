import Navbar from "./Navbar";
import logo from "../assets/images/reactSpeakLogo.png";
import Button from "./Button";

const Header = () => {
  return (
  <div>
    <header className="header">
      <img src={logo} alt="reactSpeak logo" className="header-logo" width={228} height={88} />
      <Navbar />
      <div className="header-buttons">
        <Button name="Log in" />
        <Button name="Register" />
      </div>
    </header>
  </div>
  );
};

export default Header;
