import { z } from "zod"

export enum PaymentStatusEnum {
  Pending,
  Completed,
  Failed,
  Refunded
}

export const PaymentStatusSchemaEnum = z.nativeEnum(PaymentStatusEnum)
