import { z } from "zod"

const baseNotificationSchema = z.object({
  notificationId: z.string(),
  userId: z.string(),

  title: z.string(),
  description: z.string(),
  type: z
    .string()
    .refine((val) => ["System", "Reminder", "Activity"].includes(val)),
  href: z.string(),

  status: z.boolean(),

  isRead: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const notificationSchema = baseNotificationSchema

export type NotificationType = z.infer<typeof notificationSchema>
