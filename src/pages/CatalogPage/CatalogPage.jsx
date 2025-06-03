import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  selectCampers,
  selectIsLoading,
} from "../../redux/campers/campersSlice";
import { useEffect } from "react";
import CamperDetailsPage from "../CamperDetailsPage/CamperDetailsPage";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  if (isLoading) {
    return <h2>Please wait...</h2>;
  }
  if (!Array.isArray(campers)) {
    return <p>No campers found</p>;
  }
  return (
    <div>
      <h2>CampersCatalog</h2>
      {isLoading && <p>Please wait...</p>}
      <ul>
        {campers.map((camper) => (
          <li key={camper.id}>
            <CamperDetailsPage key={camper.id} {...camper} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CatalogPage;
