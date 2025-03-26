import { EnumMeta } from "@/configs/enum"
import { z } from "zod"

export enum TransactionTypeEnum {
  Earning,
  Withdrawal,
  Refund,
  Fee,
  Bonus
}

export enum TransactionStatusEnum {
  Pending,
  Completed,
  Failed
}

export const TransactionTypeSchemaEnum = z.nativeEnum(TransactionTypeEnum)
export const TransactionStatusSchemaEnum = z.nativeEnum(TransactionStatusEnum)

export const transactionTypeMap: Record<TransactionTypeEnum, EnumMeta> = {
  [TransactionTypeEnum.Earning]: {
    label: "Thu nhập"
  },
  [TransactionTypeEnum.Withdrawal]: {
    label: "Rút tiền"
  },
  [TransactionTypeEnum.Refund]: {
    label: "Hoàn tiền"
  },
  [TransactionTypeEnum.Fee]: {
    label: "Phí"
  },
  [TransactionTypeEnum.Bonus]: {
    label: "Thưởng"
  }
}

export const transactionStatusMap: Record<TransactionStatusEnum, EnumMeta> = {
  [TransactionStatusEnum.Pending]: {
    label: "Đang xử lý",
    color: "#f97316" // orange 500
  },
  [TransactionStatusEnum.Completed]: {
    label: "Hoàn tất",
    color: "#16a34a" // green 600
  },
  [TransactionStatusEnum.Failed]: {
    label: "Thất bại",
    color: "#ef4444" // red 500
  }
}

export function getTransactionTypeMeta(type: TransactionTypeEnum): EnumMeta {
  return transactionTypeMap[type]
}

export function getTransactionStatusMeta(
  status: TransactionStatusEnum
): EnumMeta {
  return transactionStatusMap[status]
}
