import { z } from "zod"

import {
  RecurringDaySchemaEnum,
  ScheduleTimeSlotStatusSchemaEnum,
  ScheduleTypeSchemaEnum
} from "@/constants/enum/Schedule"

import { timestampFields, uuidSchema } from "./baseSchema"

const scheduleTimeSlotSchema = z.object({
  scheduleTimeSlotId: uuidSchema,
  scheduleId: uuidSchema,
  timeSlotId: uuidSchema,

  status: ScheduleTimeSlotStatusSchemaEnum,

  ...timestampFields
})

const timeSlotSchema = z.object({
  timeSlotId: uuidSchema,

  startTime: z.string(),

  ...timestampFields
})

const baseScheduleSchema = z.object({
  scheduleId: uuidSchema,
  consultantId: uuidSchema,

  type: ScheduleTypeSchemaEnum,

  recurringDay: RecurringDaySchemaEnum.optional(),
  specificDate: z.string().optional(),

  scheduleTimeSlots: z.array(scheduleTimeSlotSchema),

  ...timestampFields
})

export const scheduleSchema = baseScheduleSchema

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

export type ScheduleType = z.infer<typeof scheduleSchema>
export type CreateScheduleType = z.infer<typeof createScheduleSchema>
