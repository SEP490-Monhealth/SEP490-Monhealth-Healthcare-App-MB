import { z } from "zod"

export const weeklyMealSchema = z.object({
  date: z.string(),
  calories: z.number()
})

export const yearlyTransactionSchema = z.object({
  income: z.array(
    z.object({
      month: z.string(),
      amount: z.number()
    })
  ),
  expense: z.array(
    z.object({
      month: z.string(),
      amount: z.number()
    })
  )
})

export const yearlyBookingSchema = z.object({
  month: z.string(),
  bookings: z.number()
})

export type WeeklyMealType = z.infer<typeof weeklyMealSchema>
export type YearlyTransactionType = z.infer<typeof yearlyTransactionSchema>
export type YearlyBookingType = z.infer<typeof yearlyBookingSchema>
