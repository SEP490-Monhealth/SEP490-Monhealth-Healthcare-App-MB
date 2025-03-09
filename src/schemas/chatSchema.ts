import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

const baseChatSchema = z.object({
  chatId: uuidSchema,
  userId: uuidSchema,
  consultantId: uuidSchema,

  consultant: z.string(),
  user: z.string(),
  consultantAvatar: z.string(),
  userAvatar: z.string(),

  lastMessage: z.string(),

  ...timestampFields
})

export const chatSchema = baseChatSchema

export type ChatType = z.infer<typeof chatSchema>
