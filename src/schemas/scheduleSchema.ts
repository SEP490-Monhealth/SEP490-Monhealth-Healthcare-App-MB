import { z } from "zod"

import {
  RecurringDaySchemaEnum,
  ScheduleTimeSlotStatusSchemaEnum,
  ScheduleTypeSchemaEnum
} from "@/constants/enum/Schedule"

import { timeSchema, timestampFields, uuidSchema } from "./baseSchema"

const timeSlotSchema = z.object({
  startTime: timeSchema.shape.time,
  endTime: timeSchema.shape.time,
  status: ScheduleTimeSlotStatusSchemaEnum
})

export const createTimeSlotSchema = z.object({
  scheduleId: uuidSchema,
  startTime: timeSchema.shape.time,
  endTime: timeSchema.shape.time
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
export type CreateTimeSlotType = z.infer<typeof createTimeSlotSchema>

export type ScheduleType = z.infer<typeof scheduleSchema>
export type CreateScheduleType = z.infer<typeof createScheduleSchema>
