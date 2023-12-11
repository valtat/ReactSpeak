import { createContext, useState, useEffect } from "react";
import  countryService from "../services/countryService";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
          const data = await countryService.getAllCountries();
          setCountries(data);
        }
        fetchCountries();
      }
      , []);

    return (
        <CountryContext.Provider value={{countries}}>
        {children}
        </CountryContext.Provider>
    );
    }

