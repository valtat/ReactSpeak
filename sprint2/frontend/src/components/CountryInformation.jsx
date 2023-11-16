import React from "react";

function CountryInformation({info}) {
  return (
    <div>
      <h2 className="subtitle">General information</h2>
      <p className="text">
        {info}
      </p>
    </div>
  );
}

export default CountryInformation;
