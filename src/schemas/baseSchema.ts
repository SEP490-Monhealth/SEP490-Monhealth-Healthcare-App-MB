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
