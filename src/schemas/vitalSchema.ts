import { z } from "zod"

const vitalSchema = z.object({
  vitalId: z.string(),
  userId: z.string(),
  bloodPressure: z
    .string()
    .regex(/^\d{2,3}\/\d{2,3}$/, {
      message: "Huyết áp phải có định dạng '120/80' (tâm thu/tâm trương)"
    })
    .refine(
      (bp) => {
        const [systolic, diastolic] = bp.split("/").map(Number)
        return systolic > diastolic
      },
      { message: "Huyết áp tâm thu phải lớn hơn huyết áp tâm trương" }
    ),
  heartRate: z
    .number()
    .int({ message: "Nhịp tim phải là số nguyên" })
    .positive({ message: "Nhịp tim phải là một số dương" })
    .min(30, { message: "Nhịp tim tối thiểu là 30 bpm" })
    .max(220, { message: "Nhịp tim tối đa là 220 bpm" }),
  bloodGlucose: z
    .number()
    .positive({ message: "Đường huyết phải là một số dương" })
    .min(50, { message: "Đường huyết tối thiểu là 50 mg/dL" })
    .max(500, { message: "Đường huyết tối đa là 500 mg/dL" }),
  allergies: z
    .string()
    .max(500, { message: "Danh sách dị ứng không được dài hơn 500 ký tự" })
    .optional(),
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
