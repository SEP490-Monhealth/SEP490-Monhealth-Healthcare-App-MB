import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreatePortionType, PortionType } from "@/schemas/portionSchema"

interface PortionsResponse {
  totalPages: number
  totalItems: number
  portions: PortionType[]
}

export const getPortionByFoodId = async (
  foodId: string | undefined,
  page: number,
  limit?: number,
  search?: string,
  sort?: boolean,
  order?: boolean
): Promise<PortionsResponse> => {
  try {
    const response = await monAPI.get(`/portions/food/${foodId}`, {
      params: { page, limit, search, sort, order }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết khẩu phần ăn"
      }
    }

    const { totalPages, totalItems, items: portions } = data
    return { portions, totalPages, totalItems }
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

export const createPortion = async (
  newData: CreatePortionType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/portions`, newData)

    const { success, message } = response.data

    if (!success) {
      showModal(message || "Không thể tạo khẩu phần ăn mới")

      throw {
        isCustomError: true,
        message: message || "Không thể tạo khẩu phần ăn mới"
      }
    }

    showModal(message || "Tạo khẩu phần ăn thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi tạo khẩu phần ăn")

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
