import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseConsultantSchema = z
  .object({
    consultantId: z.string(),
    userId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên không được để trống" })
      .max(50, { message: "Tên không được dài hơn 50 ký tự" })
      .regex(/^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, {
        message: "Tên không được chứa ký tự đặc biệt hoặc số"
      }),
    avatarUrl: z.string().url({ message: "Avatar không hợp lệ" }).optional(),
    bio: z.string().max(500, {
      message: "Mô tả không được dài hơn 500 ký tự"
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

    rating: z.number().optional()
  })
  .merge(timestampSchema)

export const consultantSchema = baseConsultantSchema

const createConsultantSchema = baseConsultantSchema.pick({
  name: true,
  experience: true,
  expertise: true
})

const updateBioConsultantSchema = baseConsultantSchema.pick({
  bio: true
})

export type ConsultantType = z.infer<typeof consultantSchema>
export type CreateConsultantType = z.infer<typeof createConsultantSchema>
export type UpdateBioConsultantType = z.infer<typeof updateBioConsultantSchema>
