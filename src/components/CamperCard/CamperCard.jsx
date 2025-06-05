import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import s from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const imageUrl = camper.gallery[0].thumb;

  const getFavoritesFromStorage = () => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavoritesFromStorage();
    setIsFavorite(favorites.includes(camper.id));
  }, [camper.id]);

  const toggleFavorite = () => {
    let favorites = getFavoritesFromStorage();

    if (favorites.includes(camper.id)) {
      favorites = favorites.filter((id) => id !== camper.id);
    } else {
      favorites.push(camper.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(favorites.includes(camper.id));
  };

  const formatName = (name) => {
    if (name === "AC") {
      return name;
    }
    return name
      .replace(/([A-Z])/g, " $1")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderAmenities = () => {
    const amenitiesList = [];

    const amenityIcons = {
      transmission: "icon-diagram",
      engine: "icon-fuel-pump",
      AC: "icon-wind",
      bathroom: "icon-ph_shower",
      kitchen: "icon-cup-hot",
      TV: "icon-tv",
      radio: "icon-ui-radios",
      refrigerator: "icon-solar_fridge-outline",
      microwave: "icon-lucide_microwave",
      gas: "icon-hugeicons_gas-stove",
      water: "icon-ion_water-outline",
    };

    //лишив лише ті amenities що на макеті, але якщо треба можна розкоментувати, щоб відображались всі що true
    const requiredAmenities = ["transmission", "engine"];
    const optionalAmenities = [
      "kitchen",
      "AC",
      // "bathroom",
      // "TV",
      // "radio",
      // "refrigerator",
      // "microwave",
      // "gas",
      // "water",
    ];

    requiredAmenities.forEach((amenity) => {
      amenitiesList.push(
        <span className={s.amenity} key={amenity}>
          <svg className={s.icon}>
            <use href={`/icons/icons.svg#${amenityIcons[amenity]}`}></use>
          </svg>
          {formatName(camper[amenity])}
        </span>
      );
    });

    optionalAmenities.forEach((amenity) => {
      if (camper[amenity] === true) {
        amenitiesList.push(
          <span className={s.amenity} key={amenity}>
            <svg className={s.icon}>
              <use href={`/icons/icons.svg#${amenityIcons[amenity]}`}></use>
            </svg>
            {formatName(amenity)}
          </span>
        );
      }
    });

    return amenitiesList;
  };

  return (
    <li className={s.card}>
      <img src={imageUrl} alt={camper.name} className={s.image} />
      <div className={s.details}>
        <div className={s.header}>
          <div className={s.priceNameWrap}>
            <h2 className={s.name}>{camper.name}</h2>
            <div className={s.priceWrap}>
              <h2 className={s.price}>€{camper.price}.00</h2>
              <button className={s.favoriteButton} onClick={toggleFavorite}>
                {isFavorite ? (
                  <svg className={s.favoriteIcon}>
                    <use href="/icons/icons.svg#icon-heard-red"></use>
                  </svg>
                ) : (
                  <svg className={s.favoriteIcon}>
                    <use href="/icons/icons.svg#icon-heart"></use>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className={s.rating}>
            <svg className={s.ratingIcon}>
              <use href="/icons/icons.svg#star-yellow"></use>
            </svg>
            <p className={s.raitingText}>{camper.rating}</p>
            <p className={s.reviews}>({camper.reviews.length} Reviews)</p>
            <svg className={s.ratingIcon}>
              <use href="/icons/icons.svg#icon-Map"></use>
            </svg>
            <p className={s.location}>{camper.location}</p>
          </div>
        </div>
        <p className={s.description}>{camper.description}</p>
        <div className={s.amenities}>{renderAmenities()}</div>
        <Link to={`/catalog/${camper.id}`} className={s.link}>
          Show More
        </Link>
      </div>
    </li>
  );
};

export default CamperCard;
