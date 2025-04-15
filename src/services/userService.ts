import monAPI from "@/lib/monAPI"

import {
  UpdateAvatarType,
  UpdateUserPasswordType,
  UpdateUserType,
  UserType
} from "@/schemas/userSchema"

interface UserResponse {
  users: UserType[]
  totalPages: number
  totalItems: number
}

export const getAllUsers = async (
  page: number,
  limit?: number,
  search?: string,
  role?: string,
  status?: boolean
): Promise<UserResponse> => {
  try {
    const response = await monAPI.get(`/users`, {
      params: { page, limit, search, role, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: users } = data
    return { users, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

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
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
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
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
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
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const updateAvatarUser = async (
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
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
