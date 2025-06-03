import { useParams } from "react-router-dom";

const CamperDetailsPage = () => {
  const { id } = useParams();

  return <h2>Campers details ID: {id}</h2>;
};
export default CamperDetailsPage;
