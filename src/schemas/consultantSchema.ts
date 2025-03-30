import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const baseConsultantSchema = z.object({
  consultantId: uuidSchema,
  userId: uuidSchema,
  expertiseId: uuidSchema,

  fullName: z
    .string()
    .nonempty({ message: "Tên không được để trống" })
    .max(50, { message: "Tên không được dài hơn 50 ký tự" })
    .regex(/^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, {
      message: "Tên không được chứa ký tự đặc biệt hoặc số"
    }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phoneNumber: z
    .string()
    .regex(/^[0-9]+$/, { message: "Số điện thoại chỉ được chứa số" })
    .min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" })
    .max(15, { message: "Số điện thoại không được dài hơn 15 ký tự" }),
  avatarUrl: z.string().url({ message: "Đường dẫn không hợp lệ" }).optional(),

  bio: z.string().max(200, {
    message: "Mô tả không được dài hơn 200 ký tự"
  }),
  experience: z
    .number()
    .min(1, { message: "Kinh nghiệm phải lớn hơn hoặc bằng 1" })
    .max(100, {
      message: "Kinh nghiệm không được vượt quá 100 năm"
    }),

  expertise: z
    .string()
    .nonempty({ message: "Tên chuyên môn không được để trống" })
    .max(100, { message: "Tên chuyên môn không được dài hơn 100 ký tự" }),

  bookingCount: z.number().default(0),
  ratingCount: z.number().default(0),
  averageRating: z
    .number()
    .min(1, { message: "Đánh giá phải lớn hơn hoặc bằng 1" })
    .max(5, { message: "Đánh giá không được vượt quá 5" }),

  views: z.number(),

  isVerified: z.boolean(),
  status: z.boolean(),

  ...timestampFields
})

export const consultantSchema = baseConsultantSchema

export const createConsultantSchema = consultantSchema.pick({
  userId: true,
  bio: true,
  experience: true,
  expertise: true
})

export const updateConsultantSchema = consultantSchema.pick({
  consultantId: true,
  bio: true,
  experience: true,
  expertise: true
})

export const informationSetupSchema = consultantSchema.pick({
  bio: true,
  experience: true
})

export type ConsultantType = z.infer<typeof consultantSchema>
export type CreateConsultantType = z.infer<typeof createConsultantSchema>
export type UpdateConsultantType = z.infer<typeof updateConsultantSchema>
