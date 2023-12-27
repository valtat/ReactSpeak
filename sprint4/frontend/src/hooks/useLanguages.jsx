import countryService from "../services/countryService";
import { useState, useEffect } from "react";

const useLanguages = () => {
  const [languagesList, setLanguagesList] = useState([]);

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const data = await countryService.getUniqueLanguages();
        setLanguagesList(data);
      } catch (error) {
        console.error("An error occurred while fetching languages", error);
      }
    };

    getLanguages();
  }, []);

  return languagesList;
};

export default useLanguages;
