import { z } from "zod"

export const userSchema = z.object({
  userId: z.string(),
  fullName: z
    .string()
    .nonempty({ message: "Tên không được để trống" })
    .max(50, { message: "Tên không được dài hơn 50 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phoneNumber: z
    .string()
    .regex(/^[0-9]+$/, { message: "Số điện thoại chỉ được chứa số" })
    .min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" })
    .max(15, { message: "Số điện thoại không được dài hơn 15 ký tự" }),
  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .max(128, { message: "Mật khẩu không được dài hơn 128 ký tự" }),
  avatarUrl: z.string().url({ message: "Avatar không hợp lệ" }).optional(),
  age: z
    .number()
    .int({ message: "Tuổi phải là số nguyên" })
    .min(0, { message: "Tuổi không được nhỏ hơn 0" })
    .max(100, { message: "Tuổi không được lớn hơn 100" }),
  gender: z.enum(["Male", "Female"], { message: "Giới tính không hợp lệ" }),
  role: z.enum(["User", "Admin"], { message: "Vai trò không hợp lệ" }),
  status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const createUpdateUserSchema = userSchema.omit({
  userId: true,
  createdAt: true,
  updatedAt: true
})

export const loginUserSchema = userSchema.pick({
  email: true,
  password: true
})

export const registerUserSchema = userSchema.pick({
  fullName: true,
  email: true,
  phoneNumber: true,
  password: true
})

export type UserType = z.infer<typeof userSchema>
export type CreateUserType = z.infer<typeof createUpdateUserSchema>
export type LoginUserType = z.infer<typeof loginUserSchema>
export type RegisterUserType = z.infer<typeof registerUserSchema>
