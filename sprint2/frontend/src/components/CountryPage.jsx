import { useParams } from "react-router-dom";

const CountryPage = () => {
  console.log(useParams());
  const params = useParams();
  return <div>{params.country}</div>;
};
export default CountryPage;
