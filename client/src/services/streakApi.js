import axios from "axios";

const StreakAPI = axios.create({
  baseURL: "https://todoo-api.onrender.com/api/streaks",
});

// Add JWT to every Streak request
StreakAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default StreakAPI;