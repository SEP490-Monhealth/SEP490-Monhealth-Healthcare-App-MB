import { z } from "zod"

const baseNotificationSchema = z.object({
  notificationId: z.string(),
  userId: z.string(),

  icon: z.string(),
  title: z.string(),
  message: z.string(),
  type: z
    .string()
    .refine((val) => ["System", "Reminder", "Activity"].includes(val)),
  action_url: z.string(),

  status: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const notificationSchema = baseNotificationSchema

export type NotificationType = z.infer<typeof notificationSchema>
