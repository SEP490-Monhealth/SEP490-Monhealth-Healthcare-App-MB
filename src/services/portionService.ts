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
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: portions } = data
    return { portions, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
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
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    showModal(error.message)
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
