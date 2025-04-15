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

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as AllergyType[]
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const createUserAllergy = async (newData: CreateUserAllergyType) => {
  try {
    const response = await monAPI.post("/user-allergies", newData)

    const { success, message } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
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
