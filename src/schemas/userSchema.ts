import { z } from "zod"

const baseUserSchema = z.object({
  userId: z.string(),
  subscriptionId: z.string(),

  fullName: z
    .string()
    .nonempty({ message: "Tên không được để trống" })
    .max(50, { message: "Tên không được dài hơn 50 ký tự" })
    .regex(/^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, {
      message: "Tên không được chứa ký tự đặc biệt hoặc số"
    }),
  phoneNumber: z
    .string()
    .regex(/^[0-9]+$/, { message: "Số điện thoại chỉ được chứa số" })
    .min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" })
    .max(15, { message: "Số điện thoại không được dài hơn 15 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .max(128, { message: "Mật khẩu không được dài hơn 128 ký tự" })
    .regex(/[A-Z]/, {
      message: "Mật khẩu phải chứa ít nhất một chữ cái viết hoa"
    })
    .regex(/[a-z]/, {
      message: "Mật khẩu phải chứa ít nhất một chữ cái thường"
    })
    .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một chữ số" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"
    }),
  avatarUrl: z.string().url({ message: "Avatar không hợp lệ" }).optional(),

  role: z
    .string()
    .refine((val) => ["User", "Member", "Consultant", "Admin"].includes(val), {
      message:
        "Vai trò không hợp lệ. Chỉ chấp nhận: User, Member, Consultant, Admin"
    }),

  status: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string()
})

export const userSchema = baseUserSchema

export const createUpdateUserSchema = baseUserSchema.pick({
  fullName: true,
  phoneNumber: true,
  email: true,
  password: true,
  avatarUrl: true
})

export const phoneNumberSchema = baseUserSchema.pick({
  phoneNumber: true
})

export const passwordSchema = baseUserSchema.pick({
  password: true
})

export const resetPasswordSchema = z.object({
  password: passwordSchema.shape.password,
  confirmPassword: passwordSchema.shape.password
})

export const loginSchema = baseUserSchema.pick({
  phoneNumber: true,
  password: true
})

export const registerSchema = baseUserSchema.pick({
  fullName: true,
  phoneNumber: true,
  email: true,
  password: true
})

export type UserType = z.infer<typeof userSchema>
export type CreateUserType = z.infer<typeof createUpdateUserSchema>
export type PhoneNumberType = z.infer<typeof phoneNumberSchema>
export type PasswordType = z.infer<typeof passwordSchema>
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>
export type LoginType = z.infer<typeof loginSchema>
export type RegisterType = z.infer<typeof registerSchema>
