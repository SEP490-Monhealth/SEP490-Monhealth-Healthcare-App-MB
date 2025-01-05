import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreatePortionType, PortionType } from "@/schemas/portionSchema"

export const getPortionByFoodId = async (
  foodId: string | undefined
): Promise<PortionType[]> => {
  try {
    const response = await monAPI.get(`/portions/food/${foodId}`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as PortionType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết khẩu phần ăn."
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
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}

export const getPortionById = async (
  portionId: string | undefined
): Promise<PortionType> => {
  try {
    const response = await monAPI.get(`/portions/${portionId}`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as PortionType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết khẩu phần ăn."
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
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}

export const createPortion = async (
  portion: CreatePortionType
): Promise<string> => {
  try {
    const response = await monAPI.post(`/portions`, portion)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      }
    }

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo khẩu phần ăn mới."
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
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}

export const updatePortion = async (
  portionId: string,
  portion: PortionType
): Promise<string> => {
  try {
    const response = await monAPI.put(`/portions/${portionId}`, portion)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn."
      }
    }

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật khẩu phần ăn."
      }
    }

    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn."
      }
    }
  }
}
