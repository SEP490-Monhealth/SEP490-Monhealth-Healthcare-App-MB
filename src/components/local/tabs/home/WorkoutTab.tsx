import { useEffect } from "react"

import { View } from "react-native"

import { router, useRouter } from "expo-router"

import { LoadingOverlay } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, Progress, VStack } from "@/components/global/atoms"
import { WorkoutCard } from "@/components/global/molecules/WorkoutCard"
import { Section } from "@/components/global/organisms"

import { sampleWorkoutDailyData } from "@/constants/dailyWorkouts"

import { useAuth } from "@/contexts/AuthContext"

import { formatDateY, toFixed } from "@/utils/formatters"

import { WorkoutProgress } from "./WorkoutProgress"
import { WorkoutSummary } from "./WorkoutSummary"

interface WorkoutTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const WorkoutTab = ({
  onLoading,
  onOverlayLoading
}: WorkoutTabProps) => {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const today = formatDateY(new Date())

  const workoutData = sampleWorkoutDailyData[0]

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const workoutGoalData = {
    caloriesIntakeGoal: 200,
    caloriesBurnedGoal: 500,
    durationGoal: 100,
    stepsGoal: 1300
  }

  const caloriesBurnedValue = workoutData?.progress?.caloriesBurned || 0
  const caloriesBurnedGoal = workoutGoalData?.caloriesBurnedGoal || 0

  const caloriesBurnedData = {
    label: "Calories",
    value: workoutData?.progress?.caloriesBurned || 0,
    targetValue: caloriesBurnedGoal
  }

  const workoutsData = [
    {
      label: "Đã nạp",
      value: workoutData?.progress?.caloriesBurned || 0,
      targetValue: workoutGoalData?.caloriesIntakeGoal || 0
    },
    {
      label: "Thời gian",
      value: workoutData?.progress?.duration || 0,
      targetValue: workoutGoalData?.durationGoal || 0
    },
    {
      label: "Số bước",
      value: workoutData?.progress?.steps || 0,
      targetValue: workoutGoalData?.stepsGoal || 0
    }
  ]

  const dailyCaloriesBurnedGoal =
    caloriesBurnedGoal > 0
      ? (caloriesBurnedValue / caloriesBurnedGoal) * 100
      : 0

  useEffect(() => {
    if (onOverlayLoading) {
      onOverlayLoading(isFetching > 0 || isMutating > 0)
    }
  }, [isFetching, isMutating, onOverlayLoading])

  const handleViewWorkouts = () => router.push("/workouts")

  const handleViewWorkout = (workoutId: string) => {
    router.push(`/workouts/${workoutId}/details`)
  }

  return (
    <View className="mt-4">
      <HStack center className="justify-between">
        <WorkoutProgress
          calorieData={caloriesBurnedData}
          workoutsData={workoutsData}
        />

        <WorkoutSummary workoutsData={workoutsData} />
      </HStack>

      <Progress
        height={8}
        progress={dailyCaloriesBurnedGoal}
        labelStart="Mục tiêu hằng ngày"
        labelEnd={`${toFixed(dailyCaloriesBurnedGoal, 0)}%`}
        className="mt-8"
      />

      <Section
        label="Hoạt động hôm nay"
        actionText="Thêm bài tập"
        onPress={handleViewWorkouts}
      />

      <VStack gap={12}>
        {workoutData.items.map((item) => (
          <WorkoutCard
            key={item.workoutId}
            name={item.name}
            exercises={item.exercises}
            duration={item.duration}
            caloriesBurned={item.caloriesBurned}
            onPress={() => handleViewWorkout(item.workoutId)}
          />
        ))}
      </VStack>
    </View>
  )
}
