import { EnumMeta } from "@/configs/enum"
import { z } from "zod"

export enum WithdrawalRequestStatusEnum {
  Pending,
  Approved,
  Rejected
}

export const WithdrawalRequestStatusSchemaEnum = z.nativeEnum(
  WithdrawalRequestStatusEnum
)

const withdrawalRequestStatusMap: Record<
  WithdrawalRequestStatusEnum,
  EnumMeta
> = {
  [WithdrawalRequestStatusEnum.Pending]: {
    label: "Chờ xử lý",
    color: "#f97316" // orange 500
  },
  [WithdrawalRequestStatusEnum.Approved]: {
    label: "Đã chấp nhận",
    color: "#16a34a" // green 600
  },
  [WithdrawalRequestStatusEnum.Rejected]: {
    label: "Đã từ chối",
    color: "#ef4444" // red 500
  }
}

export function getWithdrawalRequestStatusMeta(
  status: WithdrawalRequestStatusEnum
): EnumMeta {
  return withdrawalRequestStatusMap[status]
}
