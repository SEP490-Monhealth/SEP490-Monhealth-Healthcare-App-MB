import { z } from "zod"

export enum ScheduleTypeEnum {
  OneTime,
  Recurring
}

export enum RecurringDayEnum {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun
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
