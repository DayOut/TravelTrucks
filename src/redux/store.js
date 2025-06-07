import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import campersReducer from "./campers/campersSlice";
import filtersReducer from "./filters/filtersSlice";
import favoritesReducer from "./favorites/favoritesSlice";

const favoritesPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["favorites"],
};

const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
