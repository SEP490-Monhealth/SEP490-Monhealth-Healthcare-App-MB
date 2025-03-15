import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { UpdateUserType, UserType } from "@/schemas/userSchema"

import { getAllUsers, getUserById, updateUser } from "@/services/userService"

interface UserResponse {
  users: UserType[]
  totalPages: number
  totalItems: number
}

export const useGetAllUsers = (
  page: number,
  limit?: number,
  search?: string,
  role?: string,
  status?: boolean
) => {
  const handleError = useError()

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

export const useGetUserById = (userId: string | undefined) => {
  const handleError = useError()

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
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { userId: string; updateData: UpdateUserType }
  >({
    mutationFn: async ({ userId, updateData }) => {
      try {
        return await updateUser(userId, updateData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["user", userId]
      })
    }
  })
}
