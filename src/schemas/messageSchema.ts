import { z } from "zod"

import { MessageTypeSchemaEnum } from "@/constants/enum/Chat"

import { timestampFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const messageSchema = z.object({
  messageId: uuidSchema,
  chatId: uuidSchema,
  senderId: uuidSchema,

  avatarUrl: userSchema.shape.avatarUrl.optional(),

  type: MessageTypeSchemaEnum,
  content: z.string(),

  isRead: z.boolean().default(false),

  ...timestampFields
})

export const createMessageSchema = messageSchema.pick({
  chatId: true,
  senderId: true,
  content: true
})

export const updateMessageSchema = messageSchema.pick({
  content: true
})

export type MessageType = z.infer<typeof messageSchema>
export type CreateMessageType = z.infer<typeof createMessageSchema>
export type UpdateMessageType = z.infer<typeof updateMessageSchema>
