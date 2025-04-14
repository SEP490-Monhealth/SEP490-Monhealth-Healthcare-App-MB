import { z } from "zod"

import { VerificationStatusSchemaEnum } from "@/constants/enum/Consultant"

import { timestampFields, uuidSchema } from "./baseSchema"
import { certificateSchema } from "./certificateSchema"
import { expertiseSchema } from "./expertiseSchema"
import { userSchema } from "./userSchema"

const consultantSchema = z.object({
  consultantId: uuidSchema,
  userId: uuidSchema,
  expertiseId: uuidSchema,

  fullName: userSchema.shape.fullName,
  email: userSchema.shape.email,
  phoneNumber: userSchema.shape.phoneNumber,
  avatarUrl: userSchema.shape.avatarUrl,

  expertise: expertiseSchema.shape.name,

  bio: z.string().min(10, { message: "Tiểu sử phải có ít nhất 10 ký tự" }),
  experience: z
    .number()
    .int()
    .positive({ message: "Kinh nghiệm phải là số nguyên dương" }),

  meetUrl: z.string().url({ message: "Đường dẫn không hợp lệ" }),

  bookingCount: z.number().default(0),
  ratingCount: z.number().default(0),
  averageRating: z.number().default(0),

  views: z.number(),

  verificationStatus: VerificationStatusSchemaEnum,
  status: z.boolean(),

  ...timestampFields
})

export const createConsultantSchema = consultantSchema.pick({
  userId: true,
  bio: true,
  experience: true,
  expertise: true
})

export const updateConsultantSchema = consultantSchema.pick({
  bio: true,
  experience: true
})

export const informationSetupSchema = consultantSchema.pick({
  bio: true,
  experience: true
})

export const expertiseSetupSchema = z.object({
  expertise: expertiseSchema.shape.name
})

export const certificateSetupSchema = z.object({
  number: certificateSchema.shape.number,
  certificate: certificateSchema.shape.name,
  issueDate: certificateSchema.shape.issueDate,
  expiryDate: certificateSchema.shape.expiryDate,
  issuedBy: certificateSchema.shape.issuedBy
})

export const imageSetupSchema = z.object({
  imageUrls: certificateSchema.shape.imageUrls
})

export const meetingSetupSchema = consultantSchema.pick({
  meetUrl: true
})

export type ConsultantType = z.infer<typeof consultantSchema>
export type CreateConsultantType = z.infer<typeof createConsultantSchema>
export type UpdateConsultantType = z.infer<typeof updateConsultantSchema>
