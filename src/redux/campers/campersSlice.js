import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCampers as fetchCampersAPI } from "../../services/services";

export const fetchCampers = createAsyncThunk(
    "campers/fetchCampers",
    fetchCampersAPI
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchCampers.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchCampers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.items = action.payload;
        })
        .addCase(fetchCampers.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
  },
});

export const selectCampers = (state) => state.campers.items;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;

export default campersSlice.reducer;