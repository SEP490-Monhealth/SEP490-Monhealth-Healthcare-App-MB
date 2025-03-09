import { z } from "zod"

export enum BookingStatusEnum {
  Pending,
  Confirmed,
  Completed,
  Cancelled
}

export const BookingStatusSchemaEnum = z.nativeEnum(BookingStatusEnum)
