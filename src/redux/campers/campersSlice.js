import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCampers as fetchCampersService } from "../../services/services";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  fetchCampersService
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [], // Масив кемперів (серіалізований)
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload; // Зберігаємо масив кемперів
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо повідомлення про помилку
      });
  },
});

export const selectCampers = (state) => state.campers.items;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;

export default campersSlice.reducer;
