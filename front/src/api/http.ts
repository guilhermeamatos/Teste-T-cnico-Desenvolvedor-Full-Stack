import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default http;
