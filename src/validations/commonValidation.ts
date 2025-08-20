import { z } from "zod"

export const uuidSchema = z.uuid("ID phải là UUID hợp lệ")

export const timestampFields = {
  createdAt: z.date(),
  updatedAt: z.date()
}

export const auditFields = {
  ...timestampFields,
  createdBy: z.string(),
  updatedBy: z.string()
}
