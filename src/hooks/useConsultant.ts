import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  ConsultantType,
  CreateConsultantType,
  UpdateConsultantType
} from "@/schemas/consultantSchema"

import {
  createConsultant,
  getAllConsultants,
  getConsultantById,
  updateConsultant
} from "@/services/consultantService"

interface ConsultantResponse {
  consultants: ConsultantType[]
  totalPages: number
  totalItems: number
}

export const useGetAllConsultants = (
  page: number,
  limit?: number,
  expertise?: string,
  search?: string,
  verified?: boolean,
  popular?: boolean,
  status?: boolean
) => {
  const handleError = useError()

  return useQuery<ConsultantResponse, Error>({
    queryKey: [
      "consultants",
      page,
      limit,
      expertise,
      search,
      verified,
      popular,
      status
    ],
    queryFn: async () => {
      try {
        return await getAllConsultants(
          page,
          limit,
          expertise,
          search,
          verified,
          popular,
          status
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetConsultantById = (consultantId: string | undefined) => {
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
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateConsultant = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateConsultantType>({
    mutationFn: async (newData) => {
      try {
        return await createConsultant(newData, showModal)
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
    { consultantId: string; updatedData: UpdateConsultantType }
  >({
    mutationFn: async ({ consultantId, updatedData }) => {
      try {
        return await updateConsultant(consultantId, updatedData, showModal)
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
