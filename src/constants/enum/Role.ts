import { z } from "zod"

export enum RoleEnum {
  User,
  Member,
  Consultant,
  Admin
}

export const RoleSchemaEnum = z.nativeEnum(RoleEnum)
