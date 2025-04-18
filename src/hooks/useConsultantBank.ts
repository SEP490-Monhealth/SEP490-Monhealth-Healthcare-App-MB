import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  ConsultantBankType,
  CreateConsultantBankType,
  UpdateConsultantBankType
} from "@/schemas/consultantBankSchema"

import {
  createConsultantBank,
  deleteConsultantBank,
  getConsultantBankById,
  getConsultantBanksByConsultantId,
  updateConsultantBank,
  updateConsultantBankDefault
} from "@/services/consultantBankService"

export const useGetConsultantBanksByConsultantId = (
  consultantId: string | undefined
) => {
  const handleError = useError()

  return useQuery<ConsultantBankType[], Error>({
    queryKey: [MonQueryKey.Consultant.ConsultantBanks, consultantId],
    queryFn: async () => {
      try {
        return await getConsultantBanksByConsultantId(consultantId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetConsultantBankById = (
  consultantBankId: string | undefined
) => {
  const handleError = useError()

  return useQuery<ConsultantBankType, Error>({
    queryKey: [MonQueryKey.Consultant.ConsultantBank, consultantBankId],
    queryFn: async () => {
      try {
        return await getConsultantBankById(consultantBankId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantBankId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateConsultantBank = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateConsultantBankType>({
    mutationFn: async (newData) => {
      try {
        return await createConsultantBank(newData, showModal)
      } catch (error) {
        handleError(error)
        return Promise.reject(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.ConsultantBanks]
      })
    }
  })
}

export const useUpdateConsultantBank = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    {
      consultantBankId: string | undefined
      updatedData: UpdateConsultantBankType
    }
  >({
    mutationFn: async ({ consultantBankId, updatedData }) => {
      try {
        return await updateConsultantBank(
          consultantBankId,
          updatedData,
          showModal
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.ConsultantBanks]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.ConsultantBank]
      })
    }
  })
}

export const useDeleteConsultantBank = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, string>({
    mutationFn: async (consultantBankId) => {
      try {
        return await deleteConsultantBank(consultantBankId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.ConsultantBanks]
      })
    }
  })
}

export const useUpdateConsultantBankDefault = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, string>({
    mutationFn: async (consultantBankId) => {
      try {
        return await updateConsultantBankDefault(consultantBankId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.ConsultantBanks]
      })
    }
  })
}
