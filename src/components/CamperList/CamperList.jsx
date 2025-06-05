import CamperCard from "../CamperCard/CamperCard";
import s from "./CamperList.module.css";

export const CamperList = ({ campers, isFavorite }) => {
  if (!Array.isArray(campers)) {
    return <p>No campers available</p>;
  }
  return (
    <ul className={s.camperList}>
      {campers.map((camper) => (
        <CamperCard
          key={`camper-${camper.id}`}
          camper={camper}
          isFavorite={isFavorite}
        />
      ))}
    </ul>
  );
};
