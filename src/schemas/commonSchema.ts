import { z } from "zod"

export const auditSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const timestampSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string()
})
