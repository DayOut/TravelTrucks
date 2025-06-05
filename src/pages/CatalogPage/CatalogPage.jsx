import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCampers,
  selectIsLoading,
  selectError,
} from "../../redux/campers/campersSlice";
import FilterBar from "../../components/FilterBar/FilterBar";
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
    setAllCampers([]);
    setPage(1);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    const formattedFilters = {
      page,
      limit: 3,
      location: filters.location || undefined,
      type: filters.type || undefined,
      amenities: filters.amenities || [],
    };

    dispatch(fetchCampers(formattedFilters)).then((response) => {
      if (page === 1) {
        setAllCampers(response.payload);
      } else {
        setAllCampers((prev) => [...prev, ...response.payload]);
      }

      if (response.payload.length === 0) {
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
        {!isLoading && hasMore && (
          <LoadMoreButton onClick={() => setPage((prev) => prev + 1)} />
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
