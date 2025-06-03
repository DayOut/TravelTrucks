import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./campers/campersSlice.js";
import filtersReducer from "./filters/filtersSlice.js";
import favoritesReducer from "./favorites/favoritesSlice.js";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});
