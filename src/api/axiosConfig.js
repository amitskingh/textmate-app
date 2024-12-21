import axios from "axios"

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
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
