import { z } from "zod"

import { timestampFields, uuidSchema } from "./baseSchema"

export const walletSchema = z.object({
  walletId: uuidSchema,
  consultantId: uuidSchema,

  balance: z.number(),

  status: z.boolean(),

  ...timestampFields
})

export type WalletType = z.infer<typeof walletSchema>
