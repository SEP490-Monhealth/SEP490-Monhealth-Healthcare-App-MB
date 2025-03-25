import { useEffect } from "react"

import { View } from "react-native"

import { router, useRouter } from "expo-router"

import { LoadingOverlay } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, Progress, VStack } from "@/components/global/atoms"
import { WorkoutCard } from "@/components/global/molecules/WorkoutCard"
import { Section } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useGetDailyActivityByUserId } from "@/hooks/useDailyWorkout"
import { useGetWorkoutGoal } from "@/hooks/useGoal"

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

  const { data: dailyActivityData, isLoading: isDailyActivityLoading } =
    useGetDailyActivityByUserId(userId, today)

  console.log(dailyActivityData)

  const { data: workoutGoalData, isLoading: isGoalLoading } =
    useGetWorkoutGoal(userId)

  // const workoutGoalData = {
  //   caloriesIntakeGoal: 200,
  //   caloriesBurnedGoal: 500,
  //   durationGoal: 100,
  //   stepsGoal: 1300
  // }

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    if (onLoading) {
      onLoading(
        !dailyActivityData ||
          isDailyActivityLoading ||
          !isDailyActivityLoading ||
          isGoalLoading
      )
    }
  }, [
    dailyActivityData,
    isDailyActivityLoading,
    isDailyActivityLoading,
    isGoalLoading,
    onLoading
  ])

  useEffect(() => {
    if (onOverlayLoading) {
      onOverlayLoading(isFetching > 0 || isMutating > 0)
    }
  }, [isFetching, isMutating, onOverlayLoading])

  const caloriesBurnedValue = dailyActivityData?.totalCaloriesBurned || 0
  const caloriesBurnedGoal = workoutGoalData?.caloriesBurnedGoal || 0

  const caloriesBurnedData = {
    label: "Calories",
    value: dailyActivityData?.totalCaloriesBurned || 0,
    targetValue: caloriesBurnedGoal
  }

  const workoutsData = [
    {
      label: "Đã nạp",
      value: toFixed(dailyActivityData?.totalCaloriesBurned ?? 0, 0) || 0,
      targetValue: toFixed(workoutGoalData?.caloriesBurnedGoal ?? 0, 0)
    },
    {
      label: "Thời gian",
      value: dailyActivityData?.totalDuration || 0,
      targetValue: workoutGoalData?.workoutDurationGoal || 0
    }
  ]

  const dailyCaloriesBurnedGoal =
    caloriesBurnedGoal > 0
      ? (caloriesBurnedValue / caloriesBurnedGoal) * 100
      : 0

  const handleViewWorkouts = () => router.push("/workouts")

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

      {/* <VStack gap={12}>
        {dailyActivityData.map((item) => (
          <WorkoutCard
            key={item.workoutId}
            name={item.name}
            exercises={item.exercises}
            duration={item.duration}
            caloriesBurned={item.caloriesBurned}
            onPress={() => handleViewWorkout(item.workoutId)}
          />
        ))}
      </VStack> */}
    </View>
  )
}
