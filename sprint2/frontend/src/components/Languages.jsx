import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Language from "./Language";
import { countries } from "../data";
import CountryInformation from "./CountryInformation";
import "../assets/css/CountryInformation.css";

function Languages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { countryName } = useParams();
  const country = countries.find(
    (country) => country.name.toLowerCase() === countryName
  );

  return (
    <div className="country-page-container">
      {/* <img src={country.image} className="background-image" alt='' /> */}
      <div className="container">
      <h2 className="title">{country.name.toUpperCase()}</h2>
      <div className="languages">
        {Object.values(country.languages).map((language, index) => (
          <Language
            key={index}
            icon={language.icon}
            languageName={language.languageName}
          />
        ))}
      </div>
      <div className="information">
        <CountryInformation info={country.info} />
      </div>
      </div>
      <img src={country.map} className="map-image" alt='' />
    </div>
  );
}

export default Languages;
