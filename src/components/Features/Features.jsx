import s from "./Features.module.css";

const Features = ({ camper }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  //форматування назв (наприклад, "panelTruck" -> "Panel truck")
  const formatName = (name) => {
    if (name === "AC") {
      return name;
    }
    if (name === "TV") {
      return name;
    }
    return name
      .replace(/([A-Z])/g, " $1")
      .split(" ")
      .map((word) => capitalizeFirstLetter(word))
      .join(" ");
  };

  //форматування значень (наприклад, "5.4m" -> "5.4 m")
  const formatValue = (value) => {
    return value.replace(/(\d)([a-zA-Z])/, "$1 $2");
  };

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

  //відображення аменіті з іконками
  const renderAmenities = () => {
    const amenitiesList = [];

    amenitiesList.push(
      <li className={s.vehicleItem} key="transmission">
        <svg className={s.icon}>
          <use href={`/icons/icons.svg#${amenityIcons.transmission}`}></use>
        </svg>
        {formatName(camper.transmission)}
      </li>
    );
    amenitiesList.push(
      <li className={s.vehicleItem} key="engine">
        <svg className={s.icon}>
          <use href={`/icons/icons.svg#${amenityIcons.engine}`}></use>
        </svg>
        {formatName(camper.engine)}
      </li>
    );

    // якщо аменіті true - push
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
            <svg className={s.icon}>
              <use href={`/icons/icons.svg#${amenityIcons[amenity]}`}></use>
            </svg>
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
