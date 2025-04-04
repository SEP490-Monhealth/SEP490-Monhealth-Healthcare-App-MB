import { z } from "zod"

export const uuidSchema = z.string().uuid()

export const timestampFields = {
  createdAt: z.string(),
  updatedAt: z.string()
}

export const auditFields = {
  ...timestampFields,
  createdBy: z.string(),
  updatedBy: z.string()
}

export const timeSchema = z.object({
  time: z
    .string()
    .nonempty({ message: "Thời gian không được để trống" })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Thời gian phải có định dạng HH:mm"
    })
})
