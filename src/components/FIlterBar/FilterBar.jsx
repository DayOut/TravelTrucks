import { useDispatch, useSelector } from "react-redux";
import s from "./FilterBar.module.css";
import {
  selectFilters,
  setAmenities,
  setLocation,
  setType,
} from "../../redux/filters/filtersSlice";

const amenitiesList = [
  "AC",
  "Automatic",
  "Kitchen",
  "TV",
  "Bathroom",
  "Petrol",
  "Radio",
  "Refrigerator",
  "Microwave",
  "Gas",
  "Water",
];

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "location") {
      dispatch(setLocation(value));
    } else if (name === "type") {
      dispatch(setType(value));
    } else {
      const updatedAmenities = checked
        ? [...filters.amenities, value]
        : filters.amenities.filter((amenity) => amenity !== value);
      dispatch(setAmenities(updatedAmenities));
    }
  };

  return (
    <div className={s.filterBar}>
      <div className={s.filterGroup}>
        <label htmlFor="location" className={s.filterLabel}>
          Location
        </label>
        <input
          type="text"
          name="location"
          placeholder="Enter location"
          value={filters.location}
          onChange={handleChange}
          className={s.filterInput}
          id="location"
        />
      </div>

      <div className={s.filterGroup}>
        <label className={s.filterLabel}>Amenities</label>
        <div className={s.amenitiesGroup}>
          {amenitiesList.map((amenity) => (
            <div
              key={amenity}
              className={`${s.checkboxWrap} ${
                filters.amenities.includes(amenity) ? s.active : ""
              }`}
            >
              <label htmlFor={amenity} className={s.amenityLabel}>
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onChange={handleChange}
                  className={s.amenityCheckbox}
                  id={amenity}
                />
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={s.filterGroup}>
        <label htmlFor="type" className={s.filterLabel}>
          Type
        </label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className={s.filterSelect}
        >
          <option value="">All types</option>
          <option value="campervan">Campervan</option>
          <option value="caravan">Caravan</option>
          <option value="motorhome">Motorhome</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
