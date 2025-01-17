import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const userSubscriptionSchema = z
  .object({
    userSubscriptionId: z.string(),
    subscriptionId: z.string(),
    userId: z.string(),
    expiresAt: z.string()
  })
  .merge(timestampSchema)

const baseSubscriptionSchema = z
  .object({
    subscriptionId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên gói không được để trống" })
      .refine((val) => ["Basic", "Premium"].includes(val), {
        message: "Tên gói không hợp lệ. Chỉ chấp nhận: Basic, Premium"
      }),
    price: z.number().min(0, { message: "Giá gói phải lớn hơn 0" })
  })
  .merge(timestampSchema)

export const subscriptionSchema = baseSubscriptionSchema

export type SubscriptionType = z.infer<typeof subscriptionSchema>
export type UserSubscriptionType = z.infer<typeof userSubscriptionSchema>
