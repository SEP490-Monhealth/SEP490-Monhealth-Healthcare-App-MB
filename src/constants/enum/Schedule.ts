import { EnumMeta } from "@/configs/enum"
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

export enum ScheduleExceptionStatusEnum {
  Pending,
  Approved,
  Rejected
}

export const ScheduleTypeSchemaEnum = z.nativeEnum(ScheduleTypeEnum)
export const RecurringDaySchemaEnum = z.nativeEnum(RecurringDayEnum)
export const ScheduleTimeSlotStatusSchemaEnum = z.nativeEnum(
  ScheduleTimeSlotStatusEnum
)

export const ScheduleExceptionStatusSchemaEnum = z.nativeEnum(
  ScheduleExceptionStatusEnum
)

export const scheduleExceptionStatusMap: Record<
  ScheduleExceptionStatusEnum,
  EnumMeta
> = {
  [ScheduleExceptionStatusEnum.Pending]: {
    label: "Chờ duyệt",
    color: "#f97316"
  },
  [ScheduleExceptionStatusEnum.Approved]: {
    label: "Đã duyệt",
    color: "#16a34a"
  },
  [ScheduleExceptionStatusEnum.Rejected]: {
    label: "Đã từ chối",
    color: "#ef4444"
  }
}

export function getScheduleExceptionStatusMeta(
  status: ScheduleExceptionStatusEnum
): EnumMeta {
  return scheduleExceptionStatusMap[status]
}
