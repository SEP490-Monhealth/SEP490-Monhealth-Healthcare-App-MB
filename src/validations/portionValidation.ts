import { z } from "zod"

import { PortionUnit as PortionUnitEnum } from "@/constants/enums/PortionUnit"

import { uuidSchema } from "./commonValidation"

const portionSchema = z.object({
  id: uuidSchema,
  foodId: uuidSchema,

  name: z
    .string()
    .nonempty("Tên khẩu phần không được để trống")
    .min(2, "Tên khẩu phần phải có ít nhất 2 ký tự")
    .max(30, "Tên khẩu phần không được vượt quá 30 ký tự"),
  nameEn: z
    .string()
    .nonempty("Tên khẩu phần tiếng Anh không được để trống")
    .min(2, "Tên khẩu phần tiếng Anh phải có ít nhất 2 ký tự")
    .max(30, "Tên khẩu phần tiếng Anh không được vượt quá 30 ký tự")
    .optional(),

  weight: z.number().min(1, "Trọng lượng phải từ 1g trở lên").max(10000, "Trọng lượng không được vượt quá 10000g"),
  unit: z
    .enum(Object.values(PortionUnitEnum) as [string, ...string[]], "Đơn vị không hợp lệ")
    .default(PortionUnitEnum.GRAM),

  sortOrder: z.number().int("Thứ tự phải là số nguyên").default(0),

  isDefault: z.boolean().default(false),

  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const createUpdatePortionSchema = portionSchema.pick({
  name: true,
  nameEn: true,
  weight: true,
  unit: true
})

export type Portion = z.infer<typeof portionSchema>
export type CreateUpdatePortion = z.infer<typeof createUpdatePortionSchema>
