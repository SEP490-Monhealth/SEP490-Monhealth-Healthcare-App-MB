import { z } from "zod"

const baseWaterReminderSchema = z.object({
  waterReminderId: z.string(),
  userId: z.string(),

  name: z
    .string()
    .min(3, "Tên nhắc nhở phải có ít nhất 3 ký tự")
    .max(50, "Tên nhắc nhở không được quá 50 ký tự"),
  time: z
    .string()
    .nonempty({ message: "Thời gian không được để trống" })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Thời gian phải có định dạng HH:mm"
    }),
  volume: z
    .number()
    .min(1, "Dung tích phải lớn hơn hoặc bằng 1 ml")
    .max(5000, "Dung tích không được vượt quá 5000 ml"),

  isRecurring: z.boolean(),
  status: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const waterReminderSchema = baseWaterReminderSchema

export const createWaterReminderSchema = baseWaterReminderSchema.pick({
  userId: true,
  name: true,
  time: true,
  volume: true,
  isRecurring: true
})

export const updateWaterReminderSchema = baseWaterReminderSchema.pick({
  name: true,
  time: true,
  volume: true,
  isRecurring: true
})

export type WaterReminderType = z.infer<typeof waterReminderSchema>
export type CreateWaterReminderType = z.infer<typeof createWaterReminderSchema>
export type UpdateWaterReminderType = z.infer<typeof updateWaterReminderSchema>
