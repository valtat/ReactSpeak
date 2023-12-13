
import "./CountryInformation.css";

function CountryInformation({info, image}) {
  return (
    <div>
      <h2 className="subtitle">General information</h2>
      <div className="info">
        <div className="img-container">
      <img src={"/images/" + image} alt="country" className="country-image" />
      </div>
      <p className="text">
        {info}
      </p>
      </div>
    </div>
  );
}

export default CountryInformation;
