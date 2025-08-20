import { z } from "zod"

import { Gender as GenderEnum } from "@/constants/enums/Gender"
import { Role as RoleEnum } from "@/constants/enums/Role"

import { uuidSchema } from "./commonValidation"

export const userSchema = z.object({
  id: uuidSchema,

  fullName: z
    .string()
    .nonempty("Họ và tên không được để trống")
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được vượt quá 50 ký tự")
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/u, "Họ tên chỉ được chứa chữ cái và khoảng trắng"),
  email: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ")
    .max(100, "Email không được vượt quá 100 ký tự")
    .toLowerCase(),
  phoneNumber: z
    .string()
    .nonempty("Số điện thoại không được để trống")
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(20, "Số điện thoại không được vượt quá 20 ký tự")
    .regex(/^(\+84|84|0)(3|5|7|8|9)([0-9]{8})$/, "Số điện thoại Việt Nam không hợp lệ"),
  password: z
    .string()
    .nonempty("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(255, "Mật khẩu không được vượt quá 255 ký tự")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt"
    ),

  dateOfBirth: z
    .string()
    .nonempty("Ngày sinh không được để trống")
    .date("Ngày sinh không hợp lệ")
    .refine((date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear()
      return age >= 13 && age <= 120
    }, "Tuổi phải từ 13 đến 120"),
  gender: z.enum(Object.values(GenderEnum) as [string, ...string[]]),
  avatarUrl: z
    .string()
    .url("URL hình đại diện không hợp lệ")
    .max(500, "URL hình đại diện không được vượt quá 500 ký tự")
    .nullable()
    .optional(),

  language: z.string().length(5, "Mã ngôn ngữ phải có 5 ký tự").default("vi"),
  timezone: z.string().max(30, "Múi giờ không được vượt quá 30 ký tự").default("Asia/Ho_Chi_Minh"),

  role: z.enum(Object.values(RoleEnum) as [string, ...string[]], "Vai trò không hợp lệ").default(RoleEnum.MEMBER),
  isActive: z.boolean().default(true),
  lastLoginAt: z.date().optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export type User = z.infer<typeof userSchema>
