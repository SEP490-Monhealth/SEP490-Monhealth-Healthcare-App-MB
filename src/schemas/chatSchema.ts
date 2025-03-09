import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseChatSchema = z
  .object({
    chatId: z.string(),
    userId: z.string(),
    consultantId: z.string(),

    consultant: z.string(),
    user: z.string(),
    consultantAvatar: z.string(),
    userAvatar: z.string(),

    lastMessage: z.string()
  })
  .merge(timestampSchema)

export const chatSchema = baseChatSchema

export type ChatType = z.infer<typeof chatSchema>
