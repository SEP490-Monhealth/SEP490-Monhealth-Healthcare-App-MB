import { z } from "zod"

import { PortionUnit as PortionUnitEnum } from "@/constants/enums/PortionUnit"

import { auditSchema, uuidSchema } from "./commonValidation"

const portionSchema = z.object({
  id: uuidSchema,
  foodId: uuidSchema,

  name: z
    .string()
    .nonempty({ error: "Tên khẩu phần không được để trống" })
    .min(3, { error: "Tên khẩu phần phải có ít nhất 3 ký tự" })
    .max(50, { error: "Tên khẩu phần không được vượt quá 50 ký tự" }),
  nameEn: z
    .string()
    .nonempty({ error: "Tên khẩu phần tiếng Anh không được để trống" })
    .min(3, { error: "Tên khẩu phần tiếng Anh phải có ít nhất 3 ký tự" })
    .max(50, { error: "Tên khẩu phần tiếng Anh không được vượt quá 50 ký tự" })
    .optional(),

  weight: z
    .number()
    .positive({ error: "Trọng lượng phải lớn hơn 0" })
    .min(1, { error: "Trọng lượng phải từ 1g trở lên" })
    .max(10000, { error: "Trọng lượng không được vượt quá 10000g" }),
  unit: z.enum(PortionUnitEnum, { error: "Đơn vị không hợp lệ" }).default(PortionUnitEnum.GRAM),

  sortOrder: z.number().int().nonnegative({ error: "Thứ tự sắp xếp không được âm" }).default(0),

  isDefault: z.boolean().default(false),

  ...auditSchema.shape
})

export const createUpdatePortionSchema = portionSchema.pick({
  name: true,
  nameEn: true,
  weight: true,
  unit: true
})

export type Portion = z.infer<typeof portionSchema>
export type CreateUpdatePortion = z.infer<typeof createUpdatePortionSchema>
