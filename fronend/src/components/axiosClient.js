import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://10.193.144.37:4000"
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers['token'] = token
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;