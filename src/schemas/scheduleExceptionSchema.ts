import { z } from "zod"

import { ScheduleExceptionStatusSchemaEnum } from "@/constants/enum/Schedule"

import { auditFields, uuidSchema } from "./baseSchema"

const scheduleExceptionSchema = z.object({
  scheduleExceptionId: uuidSchema,
  scheduleId: uuidSchema,
  consultantId: uuidSchema,

  date: z.string().nonempty({ message: "Ngày không được để trống" }),
  reason: z
    .string()
    .nonempty({ message: "Lý do không được để trống" })
    .min(10, {
      message: "Lý do phải có ít nhất 10 ký tự"
    }),

  status: ScheduleExceptionStatusSchemaEnum,

  ...auditFields
})

export const createScheduleExceptionSchema = scheduleExceptionSchema.pick({
  consultantId: true,
  date: true,
  reason: true
})

export const updateScheduleExceptionSchema = scheduleExceptionSchema.pick({
  date: true,
  reason: true
})

export type ScheduleExceptionType = z.infer<typeof scheduleExceptionSchema>
export type CreateScheduleExceptionType = z.infer<
  typeof createScheduleExceptionSchema
>
export type UpdateScheduleExceptionType = z.infer<
  typeof updateScheduleExceptionSchema
>
