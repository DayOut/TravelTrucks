import s from "./Features.module.css";

const Features = ({ camper }) => {
  // Функція для перетворення першої літери на велику
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Функція для форматування назв (наприклад, "panelTruck" -> "Panel truck")
  const formatName = (name) => {
    return name
      .replace(/([A-Z])/g, " $1")
      .split(" ")
      .map((word) => capitalizeFirstLetter(word))
      .join(" ");
  };

  // Функція для форматування значень (наприклад, "5.4m" -> "5.4 m")
  const formatValue = (value) => {
    return value.replace(/(\d)([a-zA-Z])/, "$1 $2");
  };

  // Функція для відображення аменіті
  const renderAmenities = () => {
    const amenitiesList = [];

    // Додаємо transmission та engine завжди
    amenitiesList.push(
      <li className={s.engine} key="transmission">
        {formatName(camper.transmission)}
      </li>
    );
    amenitiesList.push(
      <li className={s.engine} key="engine">
        {formatName(camper.engine)}
      </li>
    );

    // Додаємо інші аменіті, якщо вони true
    const optionalAmenities = [
      "AC",
      "bathroom",
      "kitchen",
      "TV",
      "radio",
      "refrigerator",
      "microwave",
      "gas",
      "water",
    ];

    optionalAmenities.forEach((amenity) => {
      if (camper[amenity] === true) {
        amenitiesList.push(
          <li className={s.vehicleItem} key={amenity}>
            {formatName(amenity)}
          </li>
        );
      }
    });

    return amenitiesList;
  };

  return (
    <div className={s.features}>
      <ul className={s.vehicleList}>{renderAmenities()}</ul>

      <h3 className={s.detailsTitle}>Vehicle details</h3>
      <ul className={s.detailsList}>
        <li>
          <div className={s.detailsItems}>
            <span>Form </span>
            <span>{formatName(camper.form)}</span>
          </div>
        </li>
        <li>
          <div className={s.detailsItems}>
            <span>Length</span> <span>{formatValue(camper.length)}</span>
          </div>
        </li>
        <li>
          <div className={s.detailsItems}>
            <span>Width</span> <span>{formatValue(camper.width)}</span>
          </div>
        </li>
        <li>
          <div className={s.detailsItems}>
            <span>Height </span>
            <span>{formatValue(camper.height)}</span>
          </div>
        </li>
        <li>
          <div className={s.detailsItems}>
            <span>Tank</span> <span>{formatValue(camper.tank)}</span>
          </div>
        </li>
        <li>
          <div className={s.detailsItems}>
            <span>Consumption</span>
            <span>{formatValue(camper.consumption)}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Features;
