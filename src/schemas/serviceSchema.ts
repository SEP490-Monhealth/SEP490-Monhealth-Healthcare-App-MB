import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseServiceSchema = z
  .object({
    serviceId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên dịch vụ không được để trống" })
      .max(100, { message: "Tên dịch vụ không được dài hơn 100 ký tự" }),
    description: z
      .string()
      .nonempty({ message: "Mô tả dịch vụ không được để trống" })
      .max(500, { message: "Mô tả dịch vụ không được dài hơn 500 ký tự" }),
    price: z.number().min(0, { message: "Giá dịch vụ phải lớn hơn 0" })
  })
  .merge(timestampSchema)

export const serviceSchema = baseServiceSchema

export const createUpdateServiceSchema = serviceSchema.pick({
  name: true,
  description: true,
  price: true
})

export type ServiceType = z.infer<typeof serviceSchema>
export type CreateUpdateServiceType = z.infer<typeof createUpdateServiceSchema>
