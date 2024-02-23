import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:7000', // Set the base URL to the proxied API path
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});