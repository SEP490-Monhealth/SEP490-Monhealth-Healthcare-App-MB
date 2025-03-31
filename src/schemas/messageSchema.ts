import { z } from "zod"

import { MessageTypeSchemaEnum } from "@/constants/enum/Chat"

import { timestampFields, uuidSchema } from "./baseSchema"
import { userSchema } from "./userSchema"

const messageSchema = z.object({
  messageId: uuidSchema,
  chatId: uuidSchema,
  senderId: uuidSchema,
  receiveId: uuidSchema,

  avatarUrl: userSchema.shape.avatarUrl.optional(),

  type: MessageTypeSchemaEnum,
  content: z.string(),

  ...timestampFields
})

export const createMessageSchema = messageSchema.pick({
  chatId: true,
  senderId: true,
  receiveId: true,
  type: true,
  content: true
})

export type MessageType = z.infer<typeof messageSchema>
export type CreateMessageType = z.infer<typeof createMessageSchema>
