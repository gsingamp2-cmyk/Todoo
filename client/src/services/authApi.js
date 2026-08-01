import axios from "axios";

const AuthAPI = axios.create({
  baseURL: "http://localhost:5001/api/auth",
});

export default AuthAPI;