import { EnumMeta } from "@/configs/enum"
import { z } from "zod"

export enum TransactionTypeEnum {
  Earning,
  Withdrawal,
  Fee,
  Bonus,
  Refund
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
    label: "Thu nhập",
    icon: require("../../../public/icons/transactions/income.png")
  },
  [TransactionTypeEnum.Withdrawal]: {
    label: "Rút tiền",
    icon: require("../../../public/icons/transactions/expense.png")
  },
  [TransactionTypeEnum.Fee]: {
    label: "Thanh toán",
    icon: require("../../../public/icons/transactions/expense.png")
  },
  [TransactionTypeEnum.Bonus]: {
    label: "Thưởng",
    icon: require("../../../public/icons/transactions/income.png")
  },
  [TransactionTypeEnum.Refund]: {
    label: "Hoàn tiền",
    icon: require("../../../public/icons/transactions/income.png")
  }
}

export const transactionStatusMap: Record<TransactionStatusEnum, EnumMeta> = {
  [TransactionStatusEnum.Pending]: {
    label: "Đang xử lý",
    color: "#f97316" // orange 500
  },
  [TransactionStatusEnum.Completed]: {
    label: "Hoàn thành",
    color: "#16a34a" // blue 500
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
