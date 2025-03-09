import { z } from "zod"

import { UserSubscriptionSchemaEnum } from "@/constants/enum/UserSubscriptionStatus"

import { auditFields, timestampFields, uuidSchema } from "./baseSchema"

const subscriptionNames = ["Gói Cơ Bản", "Gói Nâng Cao", "Gói Cao Cấp"] as const

export const baseUserSubscriptionSchema = z.object({
  userSubscriptionId: uuidSchema,
  subscriptionId: uuidSchema,
  userId: uuidSchema,

  startedAt: z
    .string()
    .datetime({ message: "Định dạng thời gian bắt đầu không hợp lệ" }),
  expiresAt: z
    .string()
    .datetime({ message: "Định dạng thời gian kết thúc không hợp lệ" }),

  status: UserSubscriptionSchemaEnum,

  ...timestampFields
})

const baseSubscriptionSchema = z.object({
  subscriptionId: uuidSchema,

  name: z
    .string()
    .nonempty({ message: "Tên gói không được để trống" })
    .refine((val) => subscriptionNames.includes(val as any), {
      message: `Tên gói không hợp lệ. Chỉ chấp nhận: ${subscriptionNames.join(", ")}`
    }),
  description: z
    .string()
    .nonempty({ message: "Mô tả không được để trống" })
    .min(10, { message: "Mô tả phải có ít nhất 10 ký tự" })
    .max(200, { message: "Mô tả không được vượt quá 200 ký tự" }),

  price: z
    .number()
    .int({ message: "Giá phải là số nguyên" })
    .nonnegative({ message: "Giá phải lớn hơn hoặc bằng 0" }),
  durationDays: z
    .number()
    .int({ message: "Thời hạn phải là số nguyên" })
    .positive({ message: "Thời hạn phải lớn hơn 0" }),
  features: z.string().nonempty({ message: "Tính năng không được để trống" }),
  maxBookings: z
    .number()
    .int({ message: "Số lượng đặt lịch phải là số nguyên" })
    .nonnegative({ message: "Số lượng đặt lịch phải lớn hơn hoặc bằng 0" })
    .default(0),

  status: z.boolean(),

  ...auditFields
})

export const subscriptionSchema = baseSubscriptionSchema

export const subscriptionUpgradeSchema = baseUserSubscriptionSchema.pick({
  userId: true,
  subscriptionId: true
})

export type UserSubscriptionType = z.infer<typeof baseUserSubscriptionSchema>
export type SubscriptionType = z.infer<typeof subscriptionSchema>
export type SubscriptionUpgradeType = z.infer<typeof subscriptionUpgradeSchema>
