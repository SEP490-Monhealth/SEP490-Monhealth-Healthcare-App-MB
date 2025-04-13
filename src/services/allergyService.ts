import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  AllergyType,
  CreateUserAllergyType,
  UpdateUserAllergyType
} from "@/schemas/allergySchema"

export const getAllergiesByUserId = async (
  userId: string | undefined
): Promise<AllergyType[]> => {
  try {
    const response = await monAPI.get(`/user-allergies/user/${userId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as AllergyType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách dị ứng của người dùng"
      }
    }
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

export const updateUserAllergy = async (
  userId: string,
  updatedData: UpdateUserAllergyType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/user-allergies/${userId}`, updatedData)

    const { success, message } = response.data

    if (!success) {
      showModal(message || "Cập nhật thông tin dị ứng thất bại")

      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật thông tin dị ứng"
      }
    }

    showModal(message || "Cập nhật thông tin dị ứng thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi cập nhật dị ứng")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}
