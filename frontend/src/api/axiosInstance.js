import axios from "axios";


const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",
  headers:{
    "Content-Type":"application/json",
  }
})

axiosInstance.interceptors.request.use((config) => {
  if(config.auth){
    const token = localStorage.getItem("token");
    if(token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default axiosInstance;
