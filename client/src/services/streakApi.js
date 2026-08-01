import axios from "axios";

const StreakAPI = axios.create({
  baseURL: "http://localhost:5001/api/streaks",
});

export default StreakAPI;