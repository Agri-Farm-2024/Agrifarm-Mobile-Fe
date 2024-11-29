import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "https://api.agrifarm.site",
});

api.interceptors.request.use(
  async (config) => {
    // Get the tokens from AsyncStorage
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    // Set the headers
    if (accessToken) {
      config.headers["authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers["refresh"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            token: refreshToken,
          });
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          await AsyncStorage.setItem("accessToken", newAccessToken);
          await AsyncStorage.setItem("refreshToken", newRefreshToken);

          originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
