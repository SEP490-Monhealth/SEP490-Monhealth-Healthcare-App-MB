import { z } from "zod"

import { Role as UserRole } from "@/constants/enums/Role"

export const userSchema = z.object({
  id: z.string().uuid("ID phải là UUID hợp lệ"),

  fullName: z
    .string()
    .trim()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được vượt quá 50 ký tự")
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/u, "Họ tên chỉ được chứa chữ cái và khoảng trắng"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Email không đúng định dạng")
    .max(100, "Email không được vượt quá 100 ký tự"),
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(11, "Số điện thoại không được vượt quá 11 ký tự")
    .regex(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/, "Số điện thoại phải đúng định dạng Việt Nam"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(50, "Mật khẩu không được vượt quá 50 ký tự")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt"
    ),

  avatarUrl: z.string().url("Avatar URL phải là URL hợp lệ").nullable().optional(),

  role: z.enum(Object.values(UserRole) as [string, ...string[]]),

  isActive: z.boolean(),

  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string().uuid(),
  updatedBy: z.string().uuid()
})

export type User = z.infer<typeof userSchema>
