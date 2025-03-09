import { z } from "zod"

export enum CategoryTypeEnum {
  Food,
  Workout
}

export const CategoryTypeSchemaEnum = z.nativeEnum(CategoryTypeEnum)
