import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const { id } = action.payload;

      // Ensure state is initialized correctly
      if (!Array.isArray(state.favorites)) {
        console.warn("Favorites state corrupted. Resetting to empty array.");
        state.favorites = [];
      }

      const existingIndex = state.favorites.findIndex((camper) => camper.id === id);

      if (existingIndex !== -1) {
        state.favorites.splice(existingIndex, 1); // remove
      } else {
        state.favorites.push(action.payload); // add
      }
    },
  },
});

// Action
export const { toggleFavorite } = favoritesSlice.actions;

// Selector
export const selectFavorites = createSelector(
    (state) => state.favorites.favorites,
    (favorites) => {
      if (Array.isArray(favorites)) {
        return [...favorites]; // shallow copy for immutability
      }
      console.error("Favorites state is not an array:", favorites);
      return [];
    }
);

// Reducer
export default favoritesSlice.reducer;