import { useQuery } from "@tanstack/react-query"

import { useErrorHandler } from "@/contexts/ErrorContext"

import { UserType } from "@/schemas/userSchema"

import { getAllUsers, getUserById } from "@/services/userService"

interface UserResponse {
  users: UserType[]
  totalPages: number
  totalItems: number
}

export const useGetAllUsers = (
  page: number,
  limit: number,
  search?: string,
  role?: string,
  status?: boolean
) => {
  const handleError = useErrorHandler()

  return useQuery<UserResponse, Error>({
    queryKey: ["users", page, limit, search, role, status],
    queryFn: async () => {
      try {
        return await getAllUsers(page, limit, search, role, status)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetUserById = (userId: string) => {
  const handleError = useErrorHandler()

  return useQuery<UserType, Error>({
    queryKey: ["user", userId],
    queryFn: async () => {
      try {
        return await getUserById(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}
