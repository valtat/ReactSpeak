import Countries from "../../components/Countries/Countries";
import { useLoaderData } from "react-router-dom";
import countryService from "../../services/countryService";

const CountriesPage = () => {
  /* const { countries } = useLoaderData(); */
  return <Countries />;
};

export default CountriesPage;
