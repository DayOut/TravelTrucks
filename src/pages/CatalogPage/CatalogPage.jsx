import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCampers,
  selectCampers,
  selectIsLoading,
} from "../../redux/campers/campersSlice";
import FilterBar from "../../components/FIlterBar/FilterBar";

import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import s from "./CatalogPage.module.css";
import { CamperList } from "../../components/CamperList/CamperList";
import { selectFilters } from "../../redux/filters/filtersSlice";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const filters = useSelector(selectFilters);

  const [page, setPage] = useState(1);
  console.log(campers);
  useEffect(() => {
    const formattedFilters = {
      ...filters,
      amenities: filters.amenities.length
        ? filters.amenities.join(",")
        : undefined,
    };
    dispatch(fetchCampers({ page, ...formattedFilters }));
  }, [dispatch, page, filters]);

  console.log(campers);

  return (
    <div className={s.catalog}>
      <FilterBar />
      <CamperList campers={campers} />
      {!isLoading && Array.isArray(campers) && campers.length > 0 && (
        <LoadMoreButton onClick={() => setPage((prev) => prev + 1)} />
      )}
      {/* {isLoading && <p>Loading...</p>} */}
    </div>
  );
};

export default CatalogPage;
