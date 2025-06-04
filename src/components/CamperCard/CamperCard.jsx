import { Link } from "react-router-dom";
import s from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const imageUrl = camper.gallery[0].thumb;

  return (
    <li className={s.card}>
      <img src={imageUrl} alt={camper.name} className={s.image} />
      <div className={s.details}>
        <h3 className={s.name}>{camper.name}</h3>
        <p className={s.price}>${camper.price} / night</p>
        <Link to={`/catalog/${camper.id}`} className={s.link}>
          Show More
        </Link>
      </div>
    </li>
  );
};

export default CamperCard;
