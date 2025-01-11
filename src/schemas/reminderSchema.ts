import { z } from "zod"

const baseReminderSchema = z.object({
  reminderId: z.string(),
  userId: z.string(),

  name: z
    .string()
    .min(3, "Tên nhắc nhở phải có ít nhất 3 ký tự")
    .max(50, "Tên nhắc nhở không được quá 50 ký tự"),

  time: z.string(),
  volume: z
    .number()
    .min(1, "Dung tích phải lớn hơn hoặc bằng 1 ml")
    .max(5000, "Dung tích không được vượt quá 5000 ml"),

  status: z.boolean(),

  isDefault: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

const reminderSchema = baseReminderSchema

export const createReminderSchema = baseReminderSchema.pick({
  userId: true,
  name: true,
  time: true,
  volume: true
})

export const updateReminderSchema = baseReminderSchema.pick({
  name: true,
  time: true,
  volume: true
})

export type ReminderType = z.infer<typeof reminderSchema>
export type CreateReminderType = z.infer<typeof createReminderSchema>
export type UpdateReminderType = z.infer<typeof updateReminderSchema>
