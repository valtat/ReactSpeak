import Country from "./Country";
// import { countries } from "../../data";
import "./Country.css";
import { useContext } from "react";
import {CountryContext} from "../../context/CountryContext";


export default function Countries() {

  const { countries } = useContext(CountryContext);

  return (
    <div>
      <h1 className="title"> Choose a country </h1>
      <div className="countries">
        {countries.map((country, index) => {
          return <Country key={country.id} {...country} index={index}/>;
        })}
      </div>
    </div>
  );
}
