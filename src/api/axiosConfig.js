import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_API_URL

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default axiosInstance
