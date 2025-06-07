import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCampers,
  selectIsLoading,
  selectError,
} from "../../redux/campers/campersSlice";
import FilterBar from "../../components/FIlterBar/FilterBar.jsx";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import s from "./CatalogPage.module.css";
import { CamperList } from "../../components/CamperList/CamperList";
import { selectFilters } from "../../redux/filters/filtersSlice";
import Loader from "../../components/Loader/Loader";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);

  const [page, setPage] = useState(1);
  const [allCampers, setAllCampers] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
    setAllCampers([]);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    const formattedFilters = {
      page,
      limit: 4,
      location: filters.location || undefined,
      form: filters.form || undefined,
      features: filters.features || [],
    };

    dispatch(fetchCampers(formattedFilters)).then((response) => {
      const newCampers = response.payload || [];

      if (page === 1) {
        setAllCampers(newCampers);
      } else {
        setAllCampers((prev) => [...prev, ...newCampers]);
      }

      if (newCampers.length < 4) {
        setHasMore(false);
      }
    });
  }, [dispatch, page, filters]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={s.catalog}>
      <FilterBar />
      <div className={s.listBtn}>
        <CamperList campers={allCampers} />
        {isLoading && page > 1 && <Loader />}
        {!isLoading && hasMore && (
          <LoadMoreButton onClick={() => setPage((prev) => prev + 1)} />
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
