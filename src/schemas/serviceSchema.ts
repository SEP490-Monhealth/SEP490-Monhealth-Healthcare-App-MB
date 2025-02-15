import { z } from "zod"

import { PricingTypeEnum, TypeEnum } from "@/constants/enums"

import { timestampSchema } from "./commonSchema"

const Type = z.nativeEnum(TypeEnum)
const PricingType = z.nativeEnum(PricingTypeEnum)

const baseServiceSchema = z
  .object({
    serviceId: z.string(),

    name: z
      .string()
      .nonempty({ message: "Tên dịch vụ không được để trống" })
      .max(100, { message: "Tên dịch vụ không được dài hơn 100 ký tự" }),
    type: Type,
    description: z
      .string()
      .nonempty({ message: "Mô tả dịch vụ không được để trống" })
      .max(500, { message: "Mô tả dịch vụ không được dài hơn 500 ký tự" }),
    price: z.number().min(1, { message: "Giá dịch vụ phải lớn hơn 0" }),
    pricingType: PricingType,
    duration: z
      .number()
      .min(1, { message: "Thời gian dịch vụ phải lớn hơn 0" }),
    onlineLink: z
      .string()
      .max(100, { message: "Đường dẫn không được dài hơn 100 ký tự" }),
    address: z
      .string()
      .max(100, { message: "Địa chỉ không được dài hơn 100 ký tự" }),
    visitHome: z.boolean(),
    maxDistance: z
      .number()
      .min(0, { message: "Khoảng cách tối đa phải lớn hơn 0" }),

    status: z.boolean()
  })
  .merge(timestampSchema)

export const serviceSchema = baseServiceSchema

export const createUpdateServiceSchema = serviceSchema.pick({
  name: true,
  type: true,
  description: true,
  price: true,
  pricingType: true,
  duration: true,
  onlineLink: true,
  address: true,
  visitHome: true,
  maxDistance: true
})

export type ServiceType = z.infer<typeof serviceSchema>
export type CreateUpdateServiceType = z.infer<typeof createUpdateServiceSchema>
