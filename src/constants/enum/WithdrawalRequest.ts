import { EnumMeta } from "@/configs/enum"
import { z } from "zod"

export enum WithdrawalRequestStatusEnum {
  Pending,
  Approved,
  Completed,
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
    label: "Đã thanh toán",
    color: "#3b82f6" // blue 500
  },
  [WithdrawalRequestStatusEnum.Completed]: {
    label: "Thất bại",
    color: "#ef4444" // red 500
  },
  [WithdrawalRequestStatusEnum.Rejected]: {
    label: "Hoàn trả",
    color: "#ca8a04" // yellow 600
  }
}

export function getPaymentStatusMeta(
  status: WithdrawalRequestStatusEnum
): EnumMeta {
  return withdrawalRequestStatusMap[status]
}
