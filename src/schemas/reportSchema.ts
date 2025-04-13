import { z } from "zod"

export const weeklyMealSchema = z.object({
  date: z.string(),
  calories: z.number()
})

export const monthlyTransactionSchema = z.object({
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

export const monthlyBookingSchema = z.object({
  month: z.string(),
  bookings: z.number()
})

export type WeeklyMealType = z.infer<typeof weeklyMealSchema>
export type MonthlyTransactionType = z.infer<typeof monthlyTransactionSchema>
export type MonthlyBookingType = z.infer<typeof monthlyBookingSchema>
