import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./campers/campersSlice.js";
import filtersReducer from "./filters/filtersSlice.js";
import favoritesReducer from "./favorites/favoritesSlice.js";
import errorMiddleware from "../components/middleware/middleware.jsx";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["campers/fetchCampers/fulfilled"],
        ignoredPaths: ["campers.items"],
      },
    }).concat(errorMiddleware),
});
