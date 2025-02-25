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
        per_page: count + 3, 
        order_by: "relevant",
      },
    });

    const results = response.data.results;
    const startIndex = 3;
    const selectedPhotos = results.slice(startIndex, startIndex + count);
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