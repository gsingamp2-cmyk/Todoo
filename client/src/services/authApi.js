import axios from "axios";

const AuthAPI = axios.create({
  baseURL: "https://todoo-api.onrender.com/api/auth",
});

export default AuthAPI;