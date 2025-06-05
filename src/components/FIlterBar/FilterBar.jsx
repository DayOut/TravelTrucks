import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setType,
  setAmenities,
} from "../../redux/filters/filtersSlice";
import { useState } from "react";
import s from "./FilterBar.module.css";

const amenitiesIcons = {
  AC: "/icons/icons.svg#icon-wind",
  Automatic: "/icons/icons.svg#icon-diagram",
  Kitchen: "/icons/icons.svg#icon-cup-hot",
  TV: "/icons/icons.svg#icon-tv",
  Bathroom: "/icons/icons.svg#icon-ph_shower",
};

const vehicleTypeIcons = {
  Van: "/icons/icons.svg#icon-bi_grid-1x2",
  FullyIntegrated: "/icons/icons.svg#icon-bi_grid",
  Alcove: "/icons/icons.svg#icon-bi_grid-3x3-gap",
};

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const [tempLocation, setTempLocation] = useState(filters.location);
  const [selectedType, setSelectedType] = useState(filters.type);
  const [selectedAmenities, setSelectedAmenities] = useState([
    ...filters.amenities,
  ]);
  const [isFocused, setIsFocused] = useState(false);

  const toggleAmenity = (value) => {
    setSelectedAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleApplyFilters = () => {
    dispatch(setLocation(tempLocation));
    dispatch(setType(selectedType));
    dispatch(setAmenities(selectedAmenities));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleApplyFilters();
    }
  };

  return (
    <div className={s.filterBar}>
      <label className={s.locationLabel} htmlFor="Location">
        Location
      </label>
      <div className={s.locationInputWrapper}>
        <svg className={s.locationIcon}>
          <use
            href={
              isFocused
                ? "/icons/icons.svg#icon-Map"
                : "/icons/icons.svg#icon-Map-1"
            }
          ></use>
        </svg>
        <input
          id="Location"
          type="text"
          value={tempLocation}
          placeholder="City"
          onChange={(e) => setTempLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={s.locationInput}
        />
      </div>

      <p className={s.filtersText}>Filters</p>
      <div className={s.filtersContainer}>
        <h3 className={s.filtersTitle}>Vehicle equipment</h3>
        <div className={s.allFiltersWrap}>
          {Object.keys(amenitiesIcons).map((item) => (
            <div
              key={item}
              className={`${s.filtersWrap} ${
                selectedAmenities.includes(item) ? s.active : ""
              }`}
              onClick={() => toggleAmenity(item)}
              onKeyDown={(e) => e.key === "Enter" && toggleAmenity(item)}
              tabIndex={0}
            >
              <svg className={s.filterIcon}>
                <use href={amenitiesIcons[item]}></use>
              </svg>
              <label className={s.filtersLabel}>{item}</label>
            </div>
          ))}
        </div>

        <h3 className={s.filtersTitle}>Vehicle type</h3>
        <div className={s.radioGroup}>
          {Object.entries(vehicleTypeIcons).map(([value, icon]) => (
            <div
              key={value}
              className={`${s.radioWrap} ${
                selectedType === value ? s.active : ""
              }`}
              onClick={() => handleTypeChange(value)}
              onKeyDown={(e) => e.key === "Enter" && handleTypeChange(value)}
              tabIndex={0}
            >
              <svg className={s.radioIcon}>
                <use href={icon} width="32" height="32"></use>
              </svg>
              <label className={s.radioLabel}>
                {value.replace(/([A-Z])/g, " $1")}
              </label>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={s.searchButton}
          onClick={handleApplyFilters}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
