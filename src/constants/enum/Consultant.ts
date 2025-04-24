import { EnumMeta } from "@/configs/enum"
import { z } from "zod"

export enum VerificationStatus {
  Pending,
  Verified,
  Rejected
}

export const VerificationStatusSchemaEnum = z.nativeEnum(VerificationStatus)

const consultantVerificationStatusMap: Record<VerificationStatus, EnumMeta> = {
  [VerificationStatus.Pending]: {
    label: "Chưa xác thực"
  },
  [VerificationStatus.Verified]: {
    label: "Đã xác thực"
  },
  [VerificationStatus.Rejected]: {
    label: "Bị từ chối"
  }
}

export function getConsultantVerificationStatusMeta(
  status: VerificationStatus
): EnumMeta {
  return consultantVerificationStatusMap[status]
}
