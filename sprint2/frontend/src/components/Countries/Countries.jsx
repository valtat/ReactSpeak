import Country from "./Country";
import { countries } from "../../data";
import "./Country.css";

export default function Countries() {
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
