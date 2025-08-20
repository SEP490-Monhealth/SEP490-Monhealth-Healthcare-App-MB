import { z } from "zod"

export const uuidSchema = z.uuid({ error: "ID phải là UUID hợp lệ" })

export const timestampSchema = z.object({
  createdAt: z.date({ error: "Ngày tạo không hợp lệ" }),
  updatedAt: z.date({ error: "Ngày cập nhật không hợp lệ" })
})

export const auditSchema = timestampSchema.extend({
  createdBy: z.string().uuid({ error: "Người tạo không hợp lệ" }),
  updatedBy: z.string().uuid({ error: "Người cập nhật không hợp lệ" })
})
