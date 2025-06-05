// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// Функція для отримання всіх кемперів із заданими параметрами
export const fetchAllCampers = async (params = {}) => {
  try {
    // Форматуємо параметри для API
    const formattedParams = {
      page: params.page || 1, // Значення за замовчуванням для `page`
      limit: params.limit || 4, // Значення за замовчуванням для `limit`
      location: params.location || undefined,
      form: params.form || undefined,
      AC: params.amenities?.includes("AC") || undefined,
      kitchen: params.amenities?.includes("kitchen") || undefined,
      bathroom: params.amenities?.includes("bathroom") || undefined,
      transmission: params.amenities?.includes("Automatic")
        ? "automatic"
        : undefined,
    };

    // Видаляємо параметри зі значенням `undefined`
    const filteredParams = Object.fromEntries(
      Object.entries(formattedParams).filter(
        ([_, value]) => value !== undefined
      )
    );

    const { data } = await axios.get(BASE_URL, { params: filteredParams });

    // Перевірка, чи data є об'єктом і містить поле items
    if (data && Array.isArray(data.items)) {
      return data.items; // Повертаємо масив кемперів
    } else {
      throw new Error("Expected an array of campers, but got something else.");
    }
  } catch (error) {
    console.error("Error fetching campers:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
    throw new Error(error.response?.data?.message || "Failed to fetch campers");
  }
};

// Функція для Redux Thunk
export const fetchCampers = async (params = {}, thunkAPI) => {
  try {
    return await fetchAllCampers(params);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
