import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Language from "./Language";
import { countries } from "../../data";
import CountryInformation from "./CountryInformation";
import "./CountryInformation.css";

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
      <div className="container">
      <h2 className="title">{country.name}</h2>
      <div className="languages">
        {country.languages.map((language) => (
          <Language
            key={language.languageName}
            icon={language.icon}
            languageName={language.languageName}
          />
        ))}
      </div>
      <div className="information">
        <CountryInformation info={country.info} />
      </div>
      </div>
      <img src={country.map} alt={country.name} className="map-image" />
    </div>
  );
}

export default Languages;
