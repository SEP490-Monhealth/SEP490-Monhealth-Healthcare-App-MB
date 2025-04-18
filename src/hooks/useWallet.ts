import { useQuery } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import { WalletType } from "@/schemas/walletSchema"

import { getWalletByConsultantId } from "@/services/walletService"

export const useGetWalletByConsultantId = (
  consultantId: string | undefined
) => {
  const handleError = useError()

  return useQuery<WalletType, Error>({
    queryKey: [MonQueryKey.Wallet.Wallet, consultantId],
    queryFn: async () => {
      try {
        return await getWalletByConsultantId(consultantId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}
