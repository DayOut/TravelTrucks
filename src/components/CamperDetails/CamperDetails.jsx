import s from "./CamperInfo.module.css";

const CamperDetails = ({ camper }) => {
  return (
    <div className={s.camperInfo}>
      <h2 className={s.name}>{camper.name}</h2>

      <ul>
        <li>{camper.type}</li>
        <li>
          <div className={s.rating}>
            <svg className={s.icon}>
              <use href="/icons/icons.svg#star-yellow"></use>
            </svg>
            <p className={s.raitingText}>{camper.rating}</p>
            <p className={s.reviews}>({camper.reviews.length} Reviews)</p>
            <svg className={s.icon}>
              <use href="/icons/icons.svg#icon-Map"></use>
            </svg>
            <p className={s.location}>{camper.location}</p>
          </div>
        </li>
        <li className={s.price}>€{camper.price}.00</li>
      </ul>
    </div>
  );
};
export default CamperDetails;
