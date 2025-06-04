import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    type: "",
    amenities: [],
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setAmenities: (state, action) => {
      state.amenities = action.payload;
    },
  },
});

export const selectLocation = (state) => state.filters.location;
export const selectType = (state) => state.filters.type;
export const selectAmenities = (state) => state.filters.amenities;
export const selectFilters = (state) => state.filters;

export const { setAmenities, setLocation, setType } = filterSlice.actions;

export default filterSlice.reducer;
