import axios  from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; // Set the base URL

axiosInstance.defaults.withCredentials = true; // Allow cookies to be sent with requests

export default axiosInstance;