import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const chatSchema = z.object({
  chatId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,

  member: z.object({
    fullName: userSchema.shape.fullName,
    avatarUrl: userSchema.shape.avatarUrl
  }),
  consultant: z.object({
    fullName: userSchema.shape.fullName,
    avatarUrl: userSchema.shape.avatarUrl
  }),

  lastMessage: z.string(),

  ...timestampFields
})

export const createChatSchema = chatSchema.pick({
  userId: true,
  consultantId: true
})

export const createChatMonAISchema = z.object({
  userId: uuidSchema,
  query: z.string()
})

export type ChatType = z.infer<typeof chatSchema>
export type CreateChatType = z.infer<typeof createChatSchema>
export type CreateChatMonAIType = z.infer<typeof createChatMonAISchema>
