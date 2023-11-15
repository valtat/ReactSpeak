import React from "react";
import { Link } from "react-router-dom";

function Country({ image, name }) {
  return (
    <article className="country-container">
      <div className="country-card">
        <Link to={`/countries/${name}`} className="country-link">
        <div className="country-image-container">
          <img src={image} className="country-img" alt={name} />
        </div>
        <div className="country-footer">
          <h3>{name}</h3>
        </div>
        </Link>
      </div>
    </article>
  );
}

export default Country;
