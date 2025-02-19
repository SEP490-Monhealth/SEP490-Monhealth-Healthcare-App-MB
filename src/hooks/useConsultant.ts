import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  ConsultantType,
  CreateConsultantType,
  UpdateConsultantBioType
} from "@/schemas/consultantSchema"

import {
  createConsultant,
  getAllConsultants,
  getConsultantById,
  getConsultantsByExpertise,
  updateBioConsultant
} from "@/services/consultantService"

interface FoodResponse {
  consultants: ConsultantType[]
  totalPages: number
  totalItems: number
}

export const useGetAllConsultants = (
  page: number,
  limit?: number,
  search?: string,
  popular?: boolean,
  status?: boolean
) => {
  const handleError = useError()

  return useQuery<FoodResponse, Error>({
    queryKey: ["consultants", page, limit, search, popular, status],
    queryFn: async () => {
      try {
        return await getAllConsultants(page, limit, search, popular, status)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetConsultantsByExpertise = (
  expertise: string,
  page: number,
  limit: number
) => {
  const handleError = useError()

  return useQuery<FoodResponse, Error>({
    queryKey: ["consultants", expertise, page, limit],
    queryFn: async () => {
      try {
        return await getConsultantsByExpertise(expertise, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetConsultantById = (consultantId: string) => {
  const handleError = useError()

  return useQuery<ConsultantType, Error>({
    queryKey: ["consultant", consultantId],
    queryFn: async () => {
      try {
        return await getConsultantById(consultantId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateConsultant = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateConsultantType>({
    mutationFn: async (newConsultantData) => {
      try {
        return await createConsultant(newConsultantData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultants"] })
    }
  })
}

export const useUpdateBioConsultant = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { consultantId: string; bioData: UpdateConsultantBioType }
  >({
    mutationFn: async ({ consultantId, bioData }) => {
      try {
        return await updateBioConsultant(consultantId, bioData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultants"] })
    }
  })
}
