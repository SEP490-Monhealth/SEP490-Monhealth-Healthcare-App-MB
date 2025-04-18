import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  UpdateAvatarType,
  UpdateUserPasswordType,
  UpdateUserType,
  UserType
} from "@/schemas/userSchema"

import {
  getUserById,
  updateUser,
  updateUserAvatar,
  updateUserPassword
} from "@/services/userService"

export const useGetUserById = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<UserType, Error>({
    queryKey: [MonQueryKey.User.User, userId],
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.User.User] })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.Consultant]
      })
    }
  })
}

export const useUpdateUserAvatar = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { userId: string; updateAvatarData: UpdateAvatarType }
  >({
    mutationFn: async ({ userId, updateAvatarData }) => {
      try {
        return await updateUserAvatar(userId, updateAvatarData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.User.User] })
    }
  })
}

export const useUpdateUserPassword = () => {
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { userId: string; updatedData: UpdateUserPasswordType }
  >({
    mutationFn: async ({ userId, updatedData }) => {
      try {
        return await updateUserPassword(userId, updatedData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}
