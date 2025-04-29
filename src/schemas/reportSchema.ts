import { z } from "zod"

import { ReportStatusSchemaEnum } from "@/constants/enum/Report"

import { timestampFields, uuidSchema } from "./baseSchema"
import { bookingDetailSchema } from "./bookingSchema"
import { userDetailSchema } from "./userSchema"

const reportSchema = z.object({
  reportId: uuidSchema,
  bookingId: uuidSchema,

  member: userDetailSchema,
  consultant: userDetailSchema,

  booking: bookingDetailSchema,

  reason: z
    .string()
    .nonempty({ message: "Lý do không được để trống" })
    .min(10, {
      message: "Lý do phải có ít nhất 10 ký tự"
    }),

  imageUrls: z
    .array(z.string().nonempty("Đường dẫn hình ảnh không hợp lệ"))
    .min(1, { message: "Cần ít nhất một hình ảnh" }),

  status: ReportStatusSchemaEnum,

  ...timestampFields
})

export const createReportSchema = reportSchema.pick({
  bookingId: true,
  reason: true,
  imageUrls: true
})

export const updateReportSchema = reportSchema.pick({
  reason: true,
  imageUrls: true
})

export type ReportType = z.infer<typeof reportSchema>
export type CreateReportType = z.infer<typeof createReportSchema>
export type UpdateReportType = z.infer<typeof updateReportSchema>
