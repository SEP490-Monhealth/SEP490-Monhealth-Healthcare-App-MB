import { z } from "zod"

import { auditSchema } from "./commonSchema"

const baseNotificationSchema = z
  .object({
    notificationId: z.string(),
    userId: z.string(),

    type: z
      .string()
      .refine((val) =>
        ["System", "Reminder", "Activity", "Booking"].includes(val)
      ),
    message: z
      .string()
      .nonempty({ message: "Nội dung thông báo không được để trống" }),
    href: z.string(),

    status: z.boolean(),

    isRead: z.boolean()
  })
  .merge(auditSchema)
  
export const notificationSchema = baseNotificationSchema

export type NotificationType = z.infer<typeof notificationSchema>
