import { z } from "zod"

const baseSubscriptionSchema = z.object({
  subscriptionId: z.string(),

  name: z
    .string()
    .nonempty({ message: "Tên gói không được để trống" })
    .refine((val) => ["Basic", "Premium"].includes(val), {
      message: "Tên gói không hợp lệ. Chỉ chấp nhận: Basic, Premium"
    }),
  price: z.number().min(0, { message: "Giá gói phải lớn hơn 0" }),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const subscriptionSchema = baseSubscriptionSchema

export type SubscriptionType = z.infer<typeof subscriptionSchema>
