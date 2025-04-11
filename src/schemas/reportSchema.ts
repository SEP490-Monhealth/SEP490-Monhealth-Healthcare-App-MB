import { z } from "zod"

export const weeklyMealSchema = z.object({
  date: z.string(),
  calories: z.number()
})

export const yearlyBookingSchema = z.object({
  month: z.string(),
  bookings: z.number()
})

export type WeeklyMealType = z.infer<typeof weeklyMealSchema>
