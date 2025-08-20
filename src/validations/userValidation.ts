import { z } from "zod"

import { Gender as GenderEnum } from "@/constants/enums/Gender"
import { Role as RoleEnum } from "@/constants/enums/Role"

import { auditSchema, uuidSchema } from "./commonValidation"

export const userSchema = z.object({
  id: uuidSchema,

  fullName: z
    .string()
    .nonempty({ error: "Họ tên không được để trống" })
    .min(3, { error: "Họ tên phải có ít nhất 3 ký tự" })
    .max(50, { error: "Họ tên không được vượt quá 50 ký tự" })
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/u, { error: "Họ tên chỉ được chứa chữ cái và khoảng trắng" }),
  email: z
    .email({ error: "Email không hợp lệ" })
    .max(100, { error: "Email không được vượt quá 100 ký tự" })
    .toLowerCase(),
  phoneNumber: z
    .string()
    .nonempty({ error: "Số điện thoại không được để trống" })
    .min(10, { error: "Số điện thoại phải có ít nhất 10 số" })
    .max(20, { error: "Số điện thoại không được vượt quá 20 ký tự" })
    .regex(/^(\+84|84|0)(3|5|7|8|9)([0-9]{8})$/, { error: "Số điện thoại Việt Nam không hợp lệ" }),
  password: z
    .string()
    .nonempty({ error: "Mật khẩu không được để trống" })
    .min(6, { error: "Mật khẩu phải có ít nhất 6 ký tự" })
    .max(255, { error: "Mật khẩu không được vượt quá 255 ký tự" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      error: "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt"
    }),

  dateOfBirth: z.date({ error: "Ngày sinh không hợp lệ" }).refine(
    (date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear()
      return age >= 13 && age <= 120
    },
    { error: "Tuổi phải từ 13 đến 120" }
  ),
  gender: z.enum(GenderEnum, { error: "Giới tính không hợp lệ" }),
  avatarUrl: z
    .url({ error: "URL hình đại diện không hợp lệ" })
    .max(500, { error: "URL hình đại diện không được vượt quá 500 ký tự" })
    .optional(),

  language: z.string().length(2, { error: "Mã ngôn ngữ phải có 2 ký tự" }).default("vi"),
  timezone: z.string().max(30, { error: "Múi giờ không được vượt quá 30 ký tự" }).default("Asia/Ho_Chi_Minh"),

  role: z.enum(RoleEnum, { error: "Vai trò không hợp lệ" }).default(RoleEnum.MEMBER),

  isActive: z.boolean().default(true),

  lastLoginAt: z.date().optional(),

  ...auditSchema.shape
})

export type User = z.infer<typeof userSchema>
