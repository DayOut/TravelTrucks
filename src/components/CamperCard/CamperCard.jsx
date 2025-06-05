import { Link } from "react-router-dom";
import s from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const imageUrl = camper.gallery[0].thumb;

  return (
    <li className={s.card}>
      <img src={imageUrl} alt={camper.name} className={s.image} />
      <div className={s.details}>
        <div className={s.header}>
          <div className={s.priceNameWrap}>
            <h2 className={s.name}>{camper.name}</h2>
            <h2 className={s.price}>€{camper.price}.00</h2>
          </div>
          <div className={s.rating}>
            <p className={s.raitingText}>{camper.rating}</p>
            <p className={s.reviews}>({camper.reviews.length} Reviews)</p>
            <p className={s.location}>{camper.location}</p>
          </div>
        </div>
        <p className={s.description}>{camper.description}</p>
        <div className={s.amenities}>
          {camper.transmission && <span>Automatic</span>}
          {camper.engine && <span>Petrol</span>}
          {camper.kitchen && <span>Kitchen</span>}
          {camper.AC && <span>AC</span>}
        </div>
        <Link to={`/catalog/${camper.id}`} className={s.link}>
          Show More
        </Link>
      </div>
    </li>
  );
};

export default CamperCard;
