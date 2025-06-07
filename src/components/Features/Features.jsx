import s from "./Features.module.css";

const Features = ({ camper }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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

  const formatValue = (value) => {
    return value.replace(/(\d)([a-zA-Z])/, "$1 $2");
  };

  const featureIcons = {
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

  const renderFeatures = () => {
    const featuresList = [];

    featuresList.push(
      <li className={s.vehicleItem} key="transmission">
        <svg className={s.icon}>
          <use href={`/icons/icons.svg#${featureIcons.transmission}`}></use>
        </svg>
        {formatName(camper.transmission)}
      </li>
    );
    featuresList.push(
      <li className={s.vehicleItem} key="engine">
        <svg className={s.icon}>
          <use href={`/icons/icons.svg#${featureIcons.engine}`}></use>
        </svg>
        {formatName(camper.engine)}
      </li>
    );

    const optionalFeatures = [
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

    optionalFeatures.forEach((feature) => {
      if (camper[feature] === true) {
        featuresList.push(
          <li className={s.vehicleItem} key={feature}>
            <svg className={s.icon}>
              <use href={`/icons/icons.svg#${featureIcons[feature]}`}></use>
            </svg>
            {formatName(feature)}
          </li>
        );
      }
    });

    return featuresList;
  };

  return (
    <div className={s.features}>
      <ul className={s.vehicleList}>{renderFeatures()}</ul>

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
