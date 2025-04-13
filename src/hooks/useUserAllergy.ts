import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  AllergyType,
  CreateUserAllergyType,
  UpdateUserAllergyType
} from "@/schemas/allergySchema"

import {
  createUserAllergy,
  getAllAllergies,
  getAllergiesByUserId,
  updateUserAllergy
} from "@/services/userAllergyService"

interface AllergyResponse {
  allergies: AllergyType[]
  totalPages: number
  totalItems: number
}

export const useGetAllAllergies = (
  page: number,
  limit?: number,
  search?: string
) => {
  const handleError = useError()

  return useQuery<AllergyResponse, Error>({
    queryKey: ["allergies", page, limit, search],
    queryFn: async () => {
      try {
        return await getAllAllergies(page, limit, search)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetAllergiesByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<AllergyType[], Error>({
    queryKey: ["allergies-user", userId],
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
      queryClient.invalidateQueries({ queryKey: ["allergies-user"] })
    }
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
