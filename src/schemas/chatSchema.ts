import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseChatSchema = z
  .object({
    chatId: z.string(),
    userId: z.string(),
    consultantId: z.string(),

    consultantName: z.string(),
    userName: z.string(),
    consultantAvatarUrl: z.string(),
    userAvatarUrl: z.string(),

    lastMessage: z.string()
  })
  .merge(timestampSchema)

export const chatSchema = baseChatSchema

export type ChatType = z.infer<typeof chatSchema>
