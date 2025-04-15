import { CategoryTypeEnum } from "@/constants/enum/Category"

import monAPI from "@/lib/monAPI"

import { CategoryType } from "@/schemas/categorySchema"

export const getCategoriesByTypes = async (
  type: CategoryTypeEnum
): Promise<CategoryType[]> => {
  try {
    const response = await monAPI.get(`/categories/${type}`)

    const { success, message, data: categories } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return categories as CategoryType[]
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
