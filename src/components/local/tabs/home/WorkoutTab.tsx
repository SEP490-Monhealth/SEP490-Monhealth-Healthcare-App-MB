import { Text, View } from "react-native"

import { LoadingOverlay } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { calculateHealthMetrics } from "@/utils/calculations"

interface WorkoutTabProps {
  onLoading: (isLoading: boolean) => void
}

export const WorkoutTab = ({ onLoading }: WorkoutTabProps) => {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const weight = 50 // kg
  const height = 170 // cm
  const age = 21 // năm
  const gender: "Male" | "Female" = "Male" // Giới tính
  const activityLevel: 1.2 | 1.375 | 1.55 | 1.725 | 1.9 = 1.375 // Mức độ hoạt động

  // Tính toán các chỉ số sức khỏe
  const healthMetrics = calculateHealthMetrics(
    weight,
    height,
    age,
    gender,
    activityLevel
  )

  // Log kết quả ra console
  console.log("Kết quả chỉ số sức khỏe:")
  console.log(`BMI: ${healthMetrics.bmi.toFixed(2)}`)
  console.log(`BMR: ${healthMetrics.bmr.toFixed(2)} kcal/day`)
  console.log(`TDEE: ${healthMetrics.tdee.toFixed(2)} kcal/day`)
  console.log(`IBW: ${healthMetrics.ibw.toFixed(2)} kg`)

  return (
    <View className="mt-6 h-full">
      <LoadingOverlay visible={isFetching > 0 || isMutating > 0} />

      <Text>asd</Text>
    </View>
  )
}
