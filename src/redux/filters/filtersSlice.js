import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    form: "",
    features: [],
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setFeatures: (state, action) => {
      state.features = action.payload;
    },
  },
});

export const selectLocation = (state) => state.filters.location;
export const selectForm = (state) => state.filters.form;
export const selectFeatures = (state) => state.filters.features;
export const selectFilters = (state) => state.filters;

export const { setFeatures, setLocation, setForm } = filterSlice.actions;

export default filterSlice.reducer;
