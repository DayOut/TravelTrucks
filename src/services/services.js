import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchAllCampers = async (params = {}) => {
  try {
    const formattedParams = {
      page: params.page || 1,
      limit: params.limit || 4,
      location: params.location || undefined,
      form: params.form || undefined,
      AC: params.features?.includes("AC") || undefined,
      kitchen: params.features?.includes("Kitchen") || undefined,
      bathroom: params.features?.includes("Bathroom") || undefined,
      TV: params.features?.includes("TV") || undefined,
      transmission: params.features?.includes("Automatic")
        ? "automatic"
        : undefined,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(formattedParams).filter(
        ([_, value]) => value !== undefined
      )
    );

    const { data } = await axios.get(BASE_URL, { params: filteredParams });

    if (data && Array.isArray(data.items)) {
      return data.items;
    } else {
      return [];
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw new Error("Failed to fetch campers");
  }
};

export const fetchCampers = async (params = {}, thunkAPI) => {
  try {
    return await fetchAllCampers(params);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
