import { EnumMeta } from "@/configs/enum"
import { z } from "zod"

export enum PaymentStatusEnum {
  Pending,
  Completed,
  Failed,
  Refunded
}

export const PaymentStatusSchemaEnum = z.nativeEnum(PaymentStatusEnum)

const paymentStatusMap: Record<PaymentStatusEnum, EnumMeta> = {
  [PaymentStatusEnum.Pending]: {
    label: "Đang xử lý",
    color: "#f97316" // orange 500
  },
  [PaymentStatusEnum.Completed]: {
    label: "Hoàn thành",
    color: "#3b82f6" // blue 500
  },
  [PaymentStatusEnum.Failed]: {
    label: "Thất bại",
    color: "#ef4444" // red 500
  },
  [PaymentStatusEnum.Refunded]: {
    label: "Hoàn trả",
    color: "#ca8a04" // yellow 600
  }
}

export function getPaymentStatusMeta(status: PaymentStatusEnum): EnumMeta {
  return paymentStatusMap[status]
}
