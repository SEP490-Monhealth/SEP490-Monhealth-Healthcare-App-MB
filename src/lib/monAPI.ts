import { appConfig } from "@/config/app"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const monAPI = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

monAPI.interceptors.request.use(
  async (config) => {
    // try {
    //   const token = await AsyncStorage.getItem("token");
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    // } catch (error) {
    //   console.log("Lỗi khi lấy token từ AsyncStorage:", error);
    // }
    // console.log("Request Config:", config);
    return config
  },
  (error) => {
    console.log("Lỗi khi gửi yêu cầu:", error)
    return Promise.reject(error)
  }
)

monAPI.interceptors.response.use(
  (response) => {
    // console.log("Phản hồi từ máy chủ:", response)
    return response
  },
  (error) => {
    console.log("Lỗi khi nhận phản hồi:", error)
    if (error.response?.status === 401) {
      console.log(
        "Không được phép truy cập, chuyển hướng đến trang đăng nhập..."
      )
    }
    return Promise.reject(error)
  }
)

export default monAPI
