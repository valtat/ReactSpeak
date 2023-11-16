import Countries from "../../components/Countries";
import { useLoaderData } from "react-router-dom";
import countryService from "../../services/countryService";

export const loader = async () => {
  const countries = await countryService.getAllCountries();
  return { countries };
};

const CountriesPage = () => {
  const { countries } = useLoaderData();
  return <Countries countries={countries} />;
};

export default CountriesPage;
