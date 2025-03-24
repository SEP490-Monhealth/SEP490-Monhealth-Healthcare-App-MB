import { z } from "zod"

export enum RoleEnum {
  Member,
  SubscriptionMember,
  Consultant,
  Admin
}

export const RoleSchemaEnum = z.nativeEnum(RoleEnum)
