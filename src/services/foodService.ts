import monAPI from "@/lib/monAPI"

import { CreateFoodType, FoodType } from "@/schemas/foodSchema"

interface FoodResponse {
  foods: FoodType[]
  totalPages: number
  totalItems: number
}

export const getAllFoods = async (
  page: number,
  limit?: number,
  category?: string,
  search?: string,
  isPublic?: boolean,
  popular?: boolean,
  status?: boolean
): Promise<FoodResponse> => {
  try {
    const response = await monAPI.get(`/foods`, {
      params: { page, limit, category, search, isPublic, popular, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: foods } = data
    return { foods, totalPages, totalItems }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getFoodsByUserId = async (
  userId: string | undefined,
  page: number,
  limit?: number
): Promise<FoodResponse> => {
  try {
    const response = await monAPI.get(`/foods/user/${userId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: foods } = data
    return { foods, totalPages, totalItems }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getFoodById = async (
  foodId: string | undefined
): Promise<FoodType> => {
  try {
    const response = await monAPI.get(`/foods/${foodId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as FoodType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const createFood = async (
  newData: CreateFoodType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/foods`, newData)
    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}
