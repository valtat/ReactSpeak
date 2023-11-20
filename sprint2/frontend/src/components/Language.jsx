import React from "react";
import { Link } from "react-router-dom";

function Language({ icon, languageName }) {
  return (
      <div className="language-card">
        <Link to={`/${languageName}`} className="language-link">
          <div className="language-image-container">
            <img src={icon} alt={languageName} />
          </div>
          <div className="language-footer">
            <h3>{languageName}</h3>
          </div>
        </Link>
      </div>
  );
}

export default Language;
