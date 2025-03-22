import axios from "axios"

import { CategoryTypeEnum } from "@/constants/enum/Category"

import monAPI from "@/lib/monAPI"

import { CategoryType } from "@/schemas/categorySchema"

export const getCategoriesByTypes = async (
  type: CategoryTypeEnum
): Promise<CategoryType[]> => {
  try {
    const response = await monAPI.get(`/categories/${type}`)

    const { success, message, data: categories } = response.data

    if (success) {
      return categories as CategoryType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách danh mục"
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
