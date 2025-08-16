import { z } from "zod"

import { userSchema } from "./userValidation"

const loginSchema = z.object({
  email: userSchema.shape.email,
  password: userSchema.shape.password
})

const registerSchema = z.object({
  fullName: userSchema.shape.fullName,
  email: userSchema.shape.email,
  phoneNumber: userSchema.shape.phoneNumber,
  password: userSchema.shape.password
})

export type Login = z.infer<typeof loginSchema>
export type Register = z.infer<typeof registerSchema>
