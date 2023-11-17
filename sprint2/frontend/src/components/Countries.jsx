import Country from "./Country";
import { countries } from "../data";
import "../assets/css/Country.css";

export default function Countries() {
  console.log(countries);
  return (
    <div>
      <h1 className="title"> Choose a country </h1>
      <div className="countries">
        {countries.map((country) => {
          return <Country key={country.id} {...country} />;
        })}
      </div>
    </div>
  );
}
