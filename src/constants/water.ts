import { WaterType } from "@/schemas/waterSchema"

export const sampleWaterData: WaterType[] = [
  {
    waterIntakeId: "Water 1",
    amount: 250,
    time: "08:00",
    status: true
  },
  {
    waterIntakeId: "Water 2",
    amount: 500,
    time: "09:00",
    status: true
  },
  {
    waterIntakeId: "Water 3",
    amount: 300,
    time: "10:00",
    status: true
  },
  {
    waterIntakeId: "Water 4",
    amount: 200,
    time: "15:00",
    status: false
  }
]
