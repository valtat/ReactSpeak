import React from "react";
import { Link } from "react-router-dom";

function Language({ flag, languageName }) {
  return (
    <article className="country-container">
      <div className="country-card">
        <Link to={`/countries/${languageName}`} className="country-link">
          <div className="country-image-container">
            <img src={flag} className="country-img" alt={languageName} />
          </div>
          <div className="country-footer">
            <h3>{languageName}</h3>
          </div>
        </Link>
      </div>
    </article>
  );
}

export default Language;
