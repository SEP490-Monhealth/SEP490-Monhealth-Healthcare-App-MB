import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { TransactionType } from "@/schemas/transactionSchema"

import { getTransactionsByConsultantId } from "@/services/transactionService"

interface TransactionResponse {
  transactions: TransactionType[]
  totalPages: number
  totalItems: number
}

export const useGetTransactionsByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<TransactionResponse, Error>({
    queryKey: ["transactions", consultantId, page, limit],
    queryFn: async () => {
      try {
        return await getTransactionsByConsultantId(consultantId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}
