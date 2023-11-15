import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Language from "./Language";
import { countries } from "../data";
import CountryInformation from "./CountryInformation";

function Languages() {

    useEffect(() => {
      window.scrollTo(0, 0)
    }
    ,[])
    
    const { countryName } = useParams();
    const country = countries.find((country) => country.name === countryName);

    if(!country) {
        return <h2>Country not found!</h2>
    }

  return (
    <div>
        <h2 className="title">{country.name}</h2>
      <div className="countries">
         <Language key={country.id} {...countries} />;
      </div>
      <div className="information">
        <CountryInformation />
      </div>
    </div>
  );
}

export default Languages;
