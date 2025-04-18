import monAPI from "@/lib/monAPI"

import {
  UpdateAvatarType,
  UpdateUserPasswordType,
  UpdateUserType,
  UserType
} from "@/schemas/userSchema"

export const getUserById = async (
  userId: string | undefined
): Promise<UserType> => {
  try {
    const response = await monAPI.get(`/users/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as UserType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const updateUser = async (
  userId: string,
  userData: UpdateUserType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/users/${userId}`, userData)

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
    throw { isCustomError: true, message: errorMessage }
  }
}

export const updateUserAvatar = async (
  userId: string,
  avatarData: UpdateAvatarType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/users/${userId}/avatar`, avatarData)

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
    throw { isCustomError: true, message: errorMessage }
  }
}

export const updateUserPassword = async (
  userId: string,
  passwordData: UpdateUserPasswordType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/users/${userId}/password`, passwordData)

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
    throw { isCustomError: true, message: errorMessage }
  }
}
