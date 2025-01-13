import { z } from "zod"

const baseScheduleSchema = z.object({
  scheduleId: z.string(),
  consultantId: z.string(),

  date: z.string().nonempty({ message: "Ngày không được để trống" }),
  time: z
    .string()
    .nonempty({ message: "Thời gian không được để trống" })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Thời gian phải có định dạng HH:mm"
    }),

  status: z.string().refine((val) => ["Available", "Booked"].includes(val), {
    message: "Trạng thái phải là: Available hoặc Booked"
  }),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

const scheduleSchema = baseScheduleSchema

export const createScheduleSchema = scheduleSchema.pick({
  consultantId: true,
  date: true,
  time: true
})

export type ScheduleType = z.infer<typeof scheduleSchema>
export type CreateScheduleType = z.infer<typeof createScheduleSchema>
