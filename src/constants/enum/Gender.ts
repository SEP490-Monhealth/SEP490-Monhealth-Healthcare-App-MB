import { z } from "zod"

export enum GenderEnum {
  Male,
  Female
}

export const GenderSchemaEnum = z.nativeEnum(GenderEnum)
