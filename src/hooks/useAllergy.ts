import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  AllergyType,
  CreateUserAllergyType,
  UpdateUserAllergyType
} from "@/schemas/allergySchema"

import {
  createUserAllergy,
  getAllergiesByUserId,
  updateUserAllergy
} from "@/services/allergyService"

export const useGetAllergiesByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<AllergyType[], Error>({
    queryKey: [MonQueryKey.Allergy.UserAllergies, userId],
    queryFn: async () => {
      try {
        return await getAllergiesByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateUserAllergy = () => {
  const handleError = useError()

  return useMutation<string, Error, CreateUserAllergyType>({
    mutationFn: async (newData) => {
      try {
        return await createUserAllergy(newData)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}

export const useUpdateUserAllergy = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { userId: string; updatedData: UpdateUserAllergyType }
  >({
    mutationFn: async ({ userId, updatedData }) => {
      try {
        return await updateUserAllergy(userId, updatedData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Allergy.UserAllergies]
      })
    }
  })
}
