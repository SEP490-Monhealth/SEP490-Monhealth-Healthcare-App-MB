import { useQuery } from "@tanstack/react-query"

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
  return useQuery<UserResponse, Error>({
    queryKey: ["users", page, limit, search, role, status],
    queryFn: () => getAllUsers(page, limit, search, role, status),
    staleTime: 1000 * 60 * 5
  })
}

export const useGetUserById = (userId: string) => {
  return useQuery<UserType, Error>({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    staleTime: 1000 * 60 * 5
  })
}
