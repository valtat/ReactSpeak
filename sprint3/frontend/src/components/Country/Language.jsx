
import { Link } from "react-router-dom";
import "./CountryInformation.css";

function Language({ flag, languageName }) {
  return (
      <div className="language-card">
        <Link to={`/${languageName}`} className="language-link">
          <div className="language-image-container">
            <img src={flag} alt={languageName} />
          </div>
          <div className="language-footer">
            <h3>{languageName}</h3>
          </div>
        </Link>
      </div>
  );
}

export default Language;
