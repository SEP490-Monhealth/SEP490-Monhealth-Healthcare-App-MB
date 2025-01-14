import { z } from "zod"

const baseSubscriptionSchema = z.object({
  subscriptionId: z.string(),

  name: z
    .string()
    .nonempty({ message: "Tên gói không được để trống" })
    .refine((val) => ["Trial", "Basic", "Premium"].includes(val), {
      message: "Tên gói phải là Trial, Basic hoặc Premium"
    }),
  price: z.number().min(0, { message: "Giá gói phải lớn hơn 0" }),
  discount: z.number().min(0, { message: "Giảm giá phải từ 0 trở lên" }),
  time: z.number().min(0, { message: "Thời gian phải từ 0 trở lên" }),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const subscriptionSchema = baseSubscriptionSchema

export type SubscriptionType = z.infer<typeof subscriptionSchema>
