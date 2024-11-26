import { z } from "zod"

const vitalSchema = z.object({
  vitalId: z.string(),
  userId: z.string(),
  bloodPressure: z
    .string()
    .regex(
      /^\d{2,3}\/\d{2,3}$/,
      "Blood pressure must be in the format '120/80'"
    ),
  heartRate: z
    .number()
    .int("Heart rate must be an integer")
    .positive("Heart rate must be a positive number")
    .min(30, "Heart rate must be at least 30 bpm")
    .max(220, "Heart rate must be at most 220 bpm"),
  bloodGlucose: z
    .number()
    .positive("Blood glucose must be a positive number")
    .min(50, "Blood glucose must be at least 50 mg/dL")
    .max(500, "Blood glucose must be at most 500 mg/dL"),
  allergies: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
})

const createUpdateVitalSchema = vitalSchema.omit({
  vitalId: true,
  createdAt: true,
  updatedAt: true
})

export type VitalType = z.infer<typeof vitalSchema>
export type CreateUpdateVitalType = z.infer<typeof createUpdateVitalSchema>
