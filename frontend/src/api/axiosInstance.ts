import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:8080
  headers: {
    "Content-Type": "application/json",
  },
});

// 필요 시 인터셉터를 통해 토큰을 자동으로 주입할 수 있습니다.
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
