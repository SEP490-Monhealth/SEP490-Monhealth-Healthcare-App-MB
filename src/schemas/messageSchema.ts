import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const messageSchema = z.object({
  messageId: uuidSchema,
  chatId: uuidSchema,
  senderId: uuidSchema,

  avatarUrl: userSchema.shape.avatarUrl.optional(),

  content: z.string(),

  isSender: z.boolean().optional(),
  isRead: z.boolean().optional(),

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
