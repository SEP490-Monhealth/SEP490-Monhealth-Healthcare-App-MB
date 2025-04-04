import { z } from "zod"

import { timeSchema, timestampFields, uuidSchema } from "./baseSchema"

const waterReminderSchema = z.object({
  waterReminderId: uuidSchema,
  userId: uuidSchema,

  name: z
    .string()
    .min(3, "Tên nhắc nhở phải có ít nhất 3 ký tự")
    .max(50, "Tên nhắc nhở không được quá 50 ký tự"),
  time: timeSchema.shape.time,
  volume: z
    .number()
    .min(1, "Dung tích phải lớn hơn hoặc bằng 1 ml")
    .max(2000, "Dung tích không được vượt quá 2000 ml"),

  isRecurring: z.boolean(),
  isDrunk: z.boolean(),

  status: z.boolean(),

  ...timestampFields
})

export const waterIntakeSchema = waterReminderSchema.pick({
  waterReminderId: true,
  name: true,
  time: true,
  volume: true,
  isDrunk: true
})

export const createWaterReminderSchema = waterReminderSchema.pick({
  userId: true,
  name: true,
  time: true,
  volume: true,
  isRecurring: true
})

export const updateWaterReminderSchema = waterReminderSchema.pick({
  name: true,
  time: true,
  volume: true,
  isRecurring: true
})

export type WaterReminderType = z.infer<typeof waterReminderSchema>
export type WaterIntakeType = z.infer<typeof waterIntakeSchema>
export type CreateWaterReminderType = z.infer<typeof createWaterReminderSchema>
export type UpdateWaterReminderType = z.infer<typeof updateWaterReminderSchema>
