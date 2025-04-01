import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreateUserAllergyType } from "@/schemas/allergySchema"

export const createUserAllergy = async (newData: CreateUserAllergyType) => {
  try {
    const response = await monAPI.post("/user-allergies", newData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo dị ứng của người dùng"
      }
    }

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}
