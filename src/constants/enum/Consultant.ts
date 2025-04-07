import { z } from "zod"

export enum VerificationStatus {
  Pending,
  Verified,
  Rejected
}

export const VerificationStatusSchemaEnum = z.nativeEnum(VerificationStatus)
