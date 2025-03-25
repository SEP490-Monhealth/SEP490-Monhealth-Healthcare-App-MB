import { z } from "zod"

import {
  RecurringDaySchemaEnum,
  ScheduleTimeSlotStatusSchemaEnum,
  ScheduleTypeSchemaEnum
} from "@/constants/enum/Schedule"

import { timestampFields, uuidSchema } from "./baseSchema"
import { waterReminderSchema } from "./waterReminderSchema"

const timeSlotSchema = z.object({
  startTime: waterReminderSchema.shape.time,
  status: ScheduleTimeSlotStatusSchemaEnum
})

const scheduleSchema = z.object({
  scheduleId: uuidSchema,
  consultantId: uuidSchema,

  type: ScheduleTypeSchemaEnum,

  recurringDay: RecurringDaySchemaEnum.optional(),
  specificDate: z.string().optional(),

  timeSlots: z.array(timeSlotSchema),

  ...timestampFields
})

const scheduleItemSchema = z.object({
  recurringDay: RecurringDaySchemaEnum.nullable().optional(),
  specificDate: z.string().nullable().optional(),

  timeSlots: z.array(z.string())
})

export const createScheduleSchema = z.object({
  consultantId: uuidSchema,

  type: ScheduleTypeSchemaEnum,

  schedules: z.array(scheduleItemSchema)
})

export type TimeSlotType = z.infer<typeof timeSlotSchema>

export type ScheduleType = z.infer<typeof scheduleSchema>
export type CreateScheduleType = z.infer<typeof createScheduleSchema>
