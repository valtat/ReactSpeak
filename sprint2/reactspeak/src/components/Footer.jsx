import PageLinks from "./PageLinks";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="copyright">ReactSpeak &copy; 2023</p>
      <SocialLinks parentClass='social-icons' itemClass='social-icon'/>
    </footer>
  );
};

export default Footer;
