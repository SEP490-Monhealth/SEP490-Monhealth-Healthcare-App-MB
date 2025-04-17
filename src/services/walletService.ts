import monAPI from "@/lib/monAPI"

import { WalletType } from "@/schemas/walletSchema"

export const getWalletByConsultantId = async (
  consultantId: string | undefined
) => {
  try {
    const response = await monAPI.get(`/wallets/consultant/${consultantId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WalletType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}
