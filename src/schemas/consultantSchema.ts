import { z } from "zod"

import { timestampSchema } from "./commonSchema"
import { expertiseSchema } from "./expertiseSchema"
import { userSchema } from "./userSchema"

const baseConsultantSchema = z
  .object({
    consultantId: z.string(),
    user: userSchema,

    bio: z.string().max(500, {
      message: "Mô tả không được dài hơn 500 ký tự"
    }),
    experience: z
      .number()
      .min(1, { message: "Kinh nghiệm phải lớn hơn hoặc bằng 1" })
      .max(100, {
        message: "Kinh nghiệm không được vượt quá 100 năm"
      }),

    expertise: expertiseSchema,

    rating: z.number().optional()
  })
  .merge(timestampSchema)

export const consultantSchema = baseConsultantSchema

const createConsultantSchema = baseConsultantSchema.pick({
  user: true,
  experience: true,
  expertise: true
})

const updateBioConsultantSchema = baseConsultantSchema.pick({
  bio: true
})

export type ConsultantType = z.infer<typeof consultantSchema>
export type CreateConsultantType = z.infer<typeof createConsultantSchema>
export type UpdateBioConsultantType = z.infer<typeof updateBioConsultantSchema>
