import axios from "axios";

const API = axios.create({
  baseURL: "https://todoo-api.onrender.com/api/todos",
});

// Add JWT to every Todo request
API.interceptors.request.use(
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

export default API;