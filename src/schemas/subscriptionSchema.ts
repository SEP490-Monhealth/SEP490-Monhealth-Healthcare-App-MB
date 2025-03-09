import { z } from "zod"

import { auditFields, timestampFields, uuidSchema } from "./baseSchema"

export const baseUserSubscriptionSchema = z.object({
  userSubscriptionId: uuidSchema,
  subscriptionId: uuidSchema,
  userId: uuidSchema,

  duration: z.number().min(0, { message: "Thời gian phải lớn hơn 0" }),
  expiresAt: z.string(),

  ...timestampFields
})

const baseSubscriptionSchema = z.object({
  subscriptionId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên gói không được để trống" })
    .refine((val) => ["Basic", "Premium"].includes(val), {
      message: "Tên gói không hợp lệ. Chỉ chấp nhận: Basic, Premium"
    }),
  price: z.number().min(0, { message: "Giá gói phải lớn hơn 0" }),

  ...auditFields
})

export const subscriptionSchema = baseSubscriptionSchema

export const subscriptionUpgradeSchema = baseUserSubscriptionSchema.pick({
  userId: true,
  subscriptionId: true,
  duration: true
})

export type UserSubscriptionType = z.infer<typeof baseUserSubscriptionSchema>
export type SubscriptionType = z.infer<typeof subscriptionSchema>
export type SubscriptionUpgradeType = z.infer<typeof subscriptionUpgradeSchema>
