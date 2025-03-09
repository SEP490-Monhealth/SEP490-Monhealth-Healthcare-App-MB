import { z } from "zod"

import { ScheduleTimeSlotStatusEnum } from "@/constants/enum/ScheduleTimeSlotStatus"
import { ScheduleTypeEnum } from "@/constants/enum/ScheduleType"

import { RecurringDayEnum } from "./../constants/enum/RecurringDay"
import { timestampSchema } from "./commonSchema"

const ScheduleTypeSchemaEnum = z.nativeEnum(ScheduleTypeEnum)
const RecurringDaySchemaEnum = z.nativeEnum(RecurringDayEnum)
const ScheduleStatusSchemaEnum = z.nativeEnum(ScheduleTimeSlotStatusEnum)

const scheduleTimeSlotSchema = z
  .object({
    scheduleTimeSlotId: z.string().uuid(),
    scheduleId: z.string().uuid(),
    timeSlotId: z.string().uuid(),

    status: ScheduleStatusSchemaEnum
  })
  .merge(timestampSchema)

const timeSlotSchema = z
  .object({
    timeSlotId: z.string().uuid(),

    startTime: z.string()
  })
  .merge(timestampSchema)

const baseScheduleSchema = z
  .object({
    scheduleId: z.string().uuid(),
    consultantId: z.string().uuid(),

    type: ScheduleTypeSchemaEnum,

    recurringDay: RecurringDaySchemaEnum.optional(),
    specificDate: z.string().optional(),

    scheduleTimeSlots: z.array(scheduleTimeSlotSchema)
  })
  .merge(timestampSchema)

export const scheduleSchema = baseScheduleSchema.pick({
  scheduleId: true,
  consultantId: true,

  type: true,

  recurringDay: true,
  specificDate: true,

  scheduleTimeSlots: true,

  createdAt: true,
  updatedAt: true
})

const scheduleItemSchema = z.object({
  recurringDay: RecurringDaySchemaEnum.nullable().optional(),
  specificDate: z.string().nullable().optional(),

  timeSlots: z.array(z.string())
})

export const createScheduleSchema = z.object({
  consultantId: z.string().uuid(),

  type: ScheduleTypeSchemaEnum,

  schedules: z.array(scheduleItemSchema)
})

export type ScheduleType = z.infer<typeof scheduleSchema>
export type CreateScheduleType = z.infer<typeof createScheduleSchema>
