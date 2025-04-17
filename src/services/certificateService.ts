import monAPI from "@/lib/monAPI"

import { CertificateType } from "@/schemas/certificateSchema"

export const getCertificatesByConsultantId = async (
  consultantId: string | undefined
): Promise<CertificateType[]> => {
  try {
    const response = await monAPI.get(
      `/certificates/consultant/${consultantId}`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as CertificateType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}
