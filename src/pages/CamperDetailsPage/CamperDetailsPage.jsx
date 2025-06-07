import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCampers,
  selectCampers,
  selectIsLoading,
} from "../../redux/campers/campersSlice";
import { selectFavorites } from "../../redux/favorites/favoritesSlice";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import s from "./CamperDetailPage.module.css";
import CamperGallery from "../../components/CamperGallery/CamperGallery";
import CamperDetails from "../../components/CamperDetails/CamperDetails.jsx";
import ReviewsSection from "../../components/ReviewsSection/ReviewsSection";
import BookingForm from "../../components/BookingForm/BookingForm";
import Features from "../../components/Features/Features";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const favorites = useSelector(selectFavorites);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    if (!campers.length) {
      dispatch(fetchCampers());
    }
  }, [dispatch, campers.length]);

  const camper = campers.find((camper) => camper.id === id);

  if (isLoading || !camper) {
    return <Loader />;
  }

  if (!isLoading && !camper) {
    return <p>Camper not found</p>;
  }

  return (
    <div className={s.container}>
      <CamperDetails
        camper={camper}
        isFavourite={favorites.some((fav) => fav.id === camper.id)}
      />
      <CamperGallery images={camper.gallery || []} camper={camper} />

      <div className={s.tabs}>
        <button
          className={activeTab === "features" ? s.active : ""}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={activeTab === "reviews" ? s.active : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className={s.componentWrapper}>
        {activeTab === "features" ? (
          <Features camper={camper} />
        ) : (
          <ReviewsSection reviews={camper.reviews || []} />
        )}

        <BookingForm id={camper.id} />
      </div>
    </div>
  );
};

export default CamperDetailsPage;
