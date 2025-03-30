import { z } from "zod"

import {
  MessageStatusSchemaEnum,
  MessageTypeSchemaEnum
} from "@/constants/enum/Chat"

import { timestampFields, uuidSchema } from "./baseSchema"

const messageSchema = z.object({
  messageId: uuidSchema,
  chatId: uuidSchema,
  senderId: uuidSchema,
  receiveId: uuidSchema,

  type: MessageTypeSchemaEnum,
  content: z.string(),

  status: MessageStatusSchemaEnum,

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
