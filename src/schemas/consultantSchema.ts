import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const consultantSchema = z.object({
  consultantId: uuidSchema,
  userId: uuidSchema,
  expertiseId: uuidSchema,

  fullName: userSchema.shape.fullName,
  email: userSchema.shape.email,
  phoneNumber: userSchema.shape.phoneNumber,
  avatarUrl: userSchema.shape.avatarUrl,

  bio: z.string().min(10, { message: "Tiểu sử phải có ít nhất 10 ký tự" }),
  experience: z
    .number()
    .int()
    .min(0, { message: "Kinh nghiệm phải là số nguyên không âm" }),

  expertise: z
    .string()
    .nonempty({ message: "Tên chuyên môn không được để trống" })
    .max(100, { message: "Tên chuyên môn không được dài hơn 100 ký tự" }),

  bookingCount: z.number().default(0),
  ratingCount: z.number().default(0),
  averageRating: z.number().default(0),

  views: z.number(),

  isVerified: z.boolean(),
  status: z.boolean(),

  ...timestampFields
})

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
