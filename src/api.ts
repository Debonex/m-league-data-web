import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 20000,
});

export default api;
