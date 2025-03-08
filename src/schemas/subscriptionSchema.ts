import { z } from "zod"

import { auditSchema, timestampSchema } from "./commonSchema"

export const baseUserSubscriptionSchema = z
  .object({
    userSubscriptionId: z.string().uuid(),
    subscriptionId: z.string().uuid(),
    userId: z.string().uuid(),
    duration: z.number().min(0, { message: "Thời gian phải lớn hơn 0" }),
    expiresAt: z.string()
  })
  .merge(timestampSchema)

const baseSubscriptionSchema = z
  .object({
    subscriptionId: z.string().uuid(),

    name: z
      .string()
      .nonempty({ message: "Tên gói không được để trống" })
      .refine((val) => ["Basic", "Premium"].includes(val), {
        message: "Tên gói không hợp lệ. Chỉ chấp nhận: Basic, Premium"
      }),
    price: z.number().min(0, { message: "Giá gói phải lớn hơn 0" })
  })
  .merge(auditSchema)

export const subscriptionSchema = baseSubscriptionSchema

export const subscriptionUpgradeSchema = baseUserSubscriptionSchema.pick({
  userId: true,
  subscriptionId: true,
  duration: true
})

export type UserSubscriptionType = z.infer<typeof baseUserSubscriptionSchema>
export type SubscriptionType = z.infer<typeof subscriptionSchema>
export type SubscriptionUpgradeType = z.infer<typeof subscriptionUpgradeSchema>
