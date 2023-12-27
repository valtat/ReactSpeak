import { useEffect, useContext } from "react";
import { useParams, useNavigate} from "react-router-dom";
import Language from "./Language";
import CountryInformation from "./CountryInformation";
import "./CountryInformation.css";
import { CountryContext } from "../../context/CountryContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Languages() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { countryName } = useParams();
  const { countries } = useContext(CountryContext);
  console.log(countries);
  const imageUrl = `/images/`

  const country = countries.find(
    (country) => country.name.toLowerCase() === countryName
  );

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className="country-page-container">
      <div className="container">
     
        <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} className="back-button"/>
       
      <h2 className="title">{country.name}</h2>
      <div className="languages">
        {country.languages.map((language) => (
          <Language
            key={language.id}
            flag={imageUrl + language.flag}
            languageName={language.language}
          />
        ))}
      </div>
      <div className="information">
        <CountryInformation info={country.description} image={country.image}/>
      </div>
      </div>
      {/* <img src={imageUrl+country.map} alt={country.name} className="map-image" /> */}
    </div>
  );
}

export default Languages;
