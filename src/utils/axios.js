import axios from "axios";

const BASE_URL = "http://botvx.pro/api/v1/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


instance.interceptors.request.use((config) => {
  const language = localStorage.getItem("language") || "vi";
  config.headers["Accept-Language"] = language;
  return config;
});

export default instance;
