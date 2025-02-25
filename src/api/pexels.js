import axios from "axios";

const ACCESS_KEY = "tFkmFlY7MUqcuaSwZ5tXo2AAYw4aGHVECsaJ8jbCGEc";
const BASE_URL = "https://api.unsplash.com/";

const unsplashAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const getPhotos = async (count = 9) => {
  try {
    const response = await unsplashAPI.get("/search/photos", {
      params: {
        query: "africa", 
        per_page: count + 3, // Fetch more photos to ensure we have enough to pick from
        order_by: "relevant",
      },
    });

    const results = response.data.results;
    const startIndex = 3; // Start from index 3
    const selectedPhotos = results.slice(startIndex, startIndex + count);

    console.log(selectedPhotos);
    return selectedPhotos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export const searchPhotos = async (query) => {
  try {
    const response = await unsplashAPI.get("/search/photos", {
      params: {
        query,
        per_page: 21,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching for photos:", error);
    throw error;
  }
};