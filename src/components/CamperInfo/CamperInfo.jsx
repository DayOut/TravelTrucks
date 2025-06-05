import { useDispatch } from "react-redux";
import s from "./CamperInfo.module.css";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";

const CamperInfo = ({ camper, isFavorite }) => {
  const dispatch = useDispatch();
  return (
    <div className={s.camperInfo}>
      <h2 className={s.name}>{camper.name}</h2>

      <ul>
        <li>{camper.type}</li>
        <li>
          <div className={s.rating}>
            <button onClick={() => dispatch(toggleFavorite(camper))}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <p className={s.raitingText}>{camper.rating}</p>
            <p className={s.reviews}>({camper.reviews.length} Reviews)</p>
            <p className={s.location}>{camper.location}</p>
          </div>
        </li>
        <li className={s.price}>€{camper.price}.00</li>
      </ul>
    </div>
  );
};
export default CamperInfo;
