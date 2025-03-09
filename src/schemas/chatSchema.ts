import { z } from "zod"

import { timestampSchema } from "./commonSchema"

const baseChatSchema = z
  .object({
    chatId: z.string(),
    consultantId: z.string(),
    userId: z.string(),

    nameConsultant: z.string(),
    nameUser: z.string(),
    avatarUrlConsultant: z.string(),
    avatarUrlUser: z.string(),
    lastMessage: z.string(),
    lastMessageAt: z.string()
  })
  .merge(timestampSchema)

export const chatSchema = baseChatSchema.pick({
  chatId: true,
  consultantId: true,
  userId: true,

  nameConsultant: true,
  nameUser: true,
  avatarUrlConsultant: true,
  avatarUrlUser: true,
  lastMessage: true,
  lastMessageAt: true
})

export type ChatType = z.infer<typeof chatSchema>
