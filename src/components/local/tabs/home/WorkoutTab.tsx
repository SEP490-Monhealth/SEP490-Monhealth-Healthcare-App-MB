import { Text, View } from "react-native"

import { useRouter } from "expo-router"

import { LoadingOverlay } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { Section } from "@/components/global/organisms"

import { calculateHealthMetrics } from "@/utils/calculations"

interface WorkoutTabProps {
  onLoading: (isLoading: boolean) => void
}

export const WorkoutTab = ({ onLoading }: WorkoutTabProps) => {
  const router = useRouter()

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const handleViewWorkouts = () => router.push("/workouts")

  return (
    <View className="mt-6 h-full">
      <LoadingOverlay visible={isFetching > 0 || isMutating > 0} />

      <Section
        label="Hoạt động hôm nay"
        action="Thêm bài tập"
        onPress={handleViewWorkouts}
      />
    </View>
  )
}
