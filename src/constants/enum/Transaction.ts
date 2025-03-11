import { z } from "zod"

export enum TransactionTypeEnum {
  Earning,
  Withdrawal,
  Refund,
  Fee,
  Bonus
}

export enum TransactionStatus {
  Pending,
  Completed,
  Failed
}

export const TransactionTypeSchemaEnum = z.nativeEnum(TransactionTypeEnum)
export const TransactionStatusSchemaEnum = z.nativeEnum(TransactionStatus)
