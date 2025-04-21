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
    const response = await monAPI.get(`/allergies/user/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as AllergyType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const createUserAllergy = async (newData: CreateUserAllergyType) => {
  try {
    const response = await monAPI.post("/allergies/user", newData)

    const { success, message } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const updateUserAllergy = async (
  userId: string,
  updatedData: UpdateUserAllergyType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/allergies/user/${userId}`, updatedData)

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
