import monAPI from "@/lib/monAPI"

import { UserType } from "@/schemas/userSchema"

interface UserResponse {
  users: UserType[]
  totalPages: number
  totalItems: number
}

export const getAllUsers = async (
  page: number,
  limit: number,
  search?: string,
  role?: string,
  status?: boolean
): Promise<UserResponse> => {
  try {
    const response = await monAPI.get(`/users`, {
      params: { page, limit, search, role, status }
    })

    if (!response || !response.data) {
      throw new Error("No response from the server")
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: users } = data
      return { users, totalPages, totalItems }
    } else {
      throw new Error(message || "Failed to fetch users")
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred"
    console.error("Error fetching users:", errorMessage)
    throw new Error(errorMessage)
  }
}

export const getUserById = async (userId: string): Promise<UserType> => {
  try {
    const response = await monAPI.get(`/users/${userId}`)

    if (!response || !response.data) {
      throw new Error("No response from the server")
    }

    const { success, message, data } = response.data

    if (success) {
      return data as UserType
    } else {
      throw new Error(message || "Failed to fetch user details")
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred"
    console.error("Error fetching user:", errorMessage)
    throw new Error(errorMessage)
  }
}
