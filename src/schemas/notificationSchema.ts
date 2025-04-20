import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

export const notificationSchema = z.object({
  notificationId: uuidSchema,
  referenceId: uuidSchema,

  title: z
    .string()
    .nonempty({ message: "Tiêu đề thông báo không được để trống" })
    .min(3, { message: "Tiêu đề thông báo phải có ít nhất 3 ký tự" })
    .max(255, { message: "Tiêu đề thông báo không được quá 255 ký tự" }),
  content: z
    .string()
    .nonempty({ message: "Nội dung thông báo không được để trống" })
    .min(10, { message: "Nội dung thông báo phải có ít nhất 10 ký tự" }),

  actionUrl: z.string().optional(),

  isRead: z.boolean().default(false),

  ...timestampFields
})

export type NotificationType = z.infer<typeof notificationSchema>
