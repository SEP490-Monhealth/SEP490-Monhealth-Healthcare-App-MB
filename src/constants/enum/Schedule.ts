import { z } from "zod"

export enum ScheduleTypeEnum {
  OneTime,
  Recurring
}

export enum RecurringDayEnum {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

export enum ScheduleTimeSlotStatusEnum {
  Available,
  Unavailable,
  Booked
}

export const ScheduleTypeSchemaEnum = z.nativeEnum(ScheduleTypeEnum)
export const RecurringDaySchemaEnum = z.nativeEnum(RecurringDayEnum)
export const ScheduleTimeSlotStatusSchemaEnum = z.nativeEnum(
  ScheduleTimeSlotStatusEnum
)
