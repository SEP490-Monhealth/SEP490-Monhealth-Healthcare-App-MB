import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { BankType } from "@/schemas/bankSchema"

import { getAllBanks, getBankById } from "@/services/bankService"

interface BankResponse {
  banks: BankType[]
  totalPages: number
  totalItems: number
}

export const useGetAllBanks = (
  page: number,
  limit?: number,
  search?: string,
  status?: boolean
) => {
  const handleError = useError()

  return useQuery<BankResponse, Error>({
    queryKey: ["banks", page, limit, search, status],
    queryFn: async () => {
      try {
        return await getAllBanks(page, limit, search, status)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetBankById = (bankId: string | undefined) => {
  const handleError = useError()

  return useQuery<BankType, Error>({
    queryKey: ["bank", bankId],
    queryFn: async () => {
      try {
        return await getBankById(bankId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!bankId
  })
}
