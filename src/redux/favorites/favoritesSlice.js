import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFavoritesFromLocalStorage(),
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.findIndex(
        (camper) => camper.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites;

export default favoritesSlice.reducer;
