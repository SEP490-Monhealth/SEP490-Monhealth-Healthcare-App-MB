import { z } from "zod"

import { StatusScheduleEnum } from "@/constants/enums"

import { timestampSchema } from "./commonSchema"

const ScheduleStatusEnum = z.nativeEnum(StatusScheduleEnum)

const baseScheduleSchema = z
  .object({
    scheduleId: z.string(),
    consultantId: z.string(),

    date: z.string().nonempty({ message: "Ngày không được để trống" }),
    time: z
      .string()
      .nonempty({ message: "Thời gian không được để trống" })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Thời gian phải có định dạng HH:mm"
      }),

    status: ScheduleStatusEnum
  })
  .merge(timestampSchema)

export const scheduleSchema = baseScheduleSchema

export const createUpdateScheduleSchema = scheduleSchema.pick({
  consultantId: true,
  date: true,
  time: true
})

export type ScheduleType = z.infer<typeof scheduleSchema>
export type CreateUpdateScheduleType = z.infer<typeof createUpdateScheduleSchema>
