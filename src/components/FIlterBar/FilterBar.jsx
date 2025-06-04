import { useDispatch, useSelector } from "react-redux";
import styles from "./FilterBar.module.css";
import {
  selectFilters,
  setAmenities,
  setLocation,
  setType,
} from "../../redux/filters/filtersSlice";

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
    <div className={styles.filterBar}>
      <input
        type="text"
        name="location"
        placeholder="Enter location"
        value={filters.location}
        onChange={handleChange}
        className={styles.input}
      />
      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="">All types</option>
        <option value="campervan">Campervan</option>
        <option value="caravan">Caravan</option>
        <option value="motorhome">Motorhome</option>
      </select>
      <label>
        <input
          type="checkbox"
          name="amenities"
          value="AC"
          checked={filters.amenities.includes("AC")}
          onChange={handleChange}
        />
        With AC
      </label>
      <label>
        <input
          type="checkbox"
          name="amenities"
          value="Bathroom"
          checked={filters.amenities.includes("Bathroom")}
          onChange={handleChange}
        />
        With Bathroom
      </label>
    </div>
  );
};

export default FilterBar;
