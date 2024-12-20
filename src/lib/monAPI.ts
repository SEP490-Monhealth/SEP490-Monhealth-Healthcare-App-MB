import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const API_URL = "https://79d3-116-109-183-17.ngrok-free.app/api/v1"

const monAPI = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

monAPI.interceptors.request.use(
  async (config) => {
    // try {
    //   const token = await AsyncStorage.getItem("token")
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`
    //   }
    // } catch (error) {
    //   console.error("Error retrieving token:", error)
    // }
    // console.log("Request:", config)
    return config
  },
  (error) => {
    console.error("Request Error:", error)
    return Promise.reject(error)
  }
)

monAPI.interceptors.response.use(
  (response) => {
    // console.log("Response:", response)
    return response
  },
  (error) => {
    console.error("Response Error:", error)
    if (error.response?.status === 401) {
      console.error("Unauthorized, redirecting to login...")
    }
    return Promise.reject(error)
  }
)

export default monAPI
