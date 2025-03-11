import { z } from "zod"

export enum UserSubscriptionStatus {
  Active,
  Expired
}

export const UserSubscriptionSchemaEnum = z.nativeEnum(UserSubscriptionStatus)
