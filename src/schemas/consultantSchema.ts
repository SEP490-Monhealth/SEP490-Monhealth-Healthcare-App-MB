import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseConsultantSchema = z
  .object({
    consultantId: z.string(),
    userId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên tư vấn viên không được để trống" })
      .max(100, { message: "Tên tư vấn viên không được dài hơn 100 ký tự" }),
    bio: z.string().max(500, {
      message: "Mô tả không được dài hơn 500 ký tự"
    }),
    avatarUrl: z.string().url({ message: "Avatar không hợp lệ" }).optional(),
    expertise: z
      .string()
      .nonempty({ message: "Chuyên ngành không được để trống" })
      .max(100, { message: "Chuyên ngành không được dài hơn 100 ký tự" }),
    experience: z
      .number()
      .min(1, { message: "Kinh nghiệm phải lớn hơn hoặc bằng 1" })
      .max(100, {
        message: "Kinh nghiệm không được vượt quá 100 năm"
      }),
    rating: z.number().optional()
  })
  .merge(timestampSchema)

export const consultantSchema = baseConsultantSchema

export type ConsultantType = z.infer<typeof consultantSchema>
