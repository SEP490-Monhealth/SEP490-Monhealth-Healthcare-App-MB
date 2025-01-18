import { useEffect } from "react"

import { View } from "react-native"

import { router } from "expo-router"

import { LoadingOverlay } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, Progress, VStack } from "@/components/global/atoms"
import { WorkoutCard } from "@/components/global/molecules/WorkoutCard"
import { Section } from "@/components/global/organisms"

import { sampleWorkoutDailyData } from "@/constants/dailyWorkouts"

import { useRouterHandlers } from "@/hooks/useRouter"

import { toFixed } from "@/utils/formatters"

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
  const workoutsData = sampleWorkoutDailyData[0]

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const goalData = {
    workoutDurationGoal: 100,
    caloriesBurnedGoal: 500,
    stepsGoal: 1300
  }

  const caloriesBurnedGoal = goalData?.caloriesBurnedGoal || 0
  const caloriesValue = workoutsData?.progress?.calories || 0

  const caloriesProgress =
    caloriesBurnedGoal > 0 ? (caloriesValue / caloriesBurnedGoal) * 100 : 0

  const caloriesData = {
    label: "Calories",
    value: workoutsData?.progress?.calories || 0,
    targetValue: caloriesBurnedGoal
  }

  const workoutData = [
    {
      label: "Thời gian",
      value: workoutsData?.progress?.duration || 0,
      targetValue: goalData?.workoutDurationGoal || 0
    },
    {
      label: "Calo",
      value: workoutsData?.progress?.calories || 0,
      targetValue: goalData?.caloriesBurnedGoal || 0
    },
    {
      label: "Bước chân",
      value: workoutsData?.progress?.steps || 0,
      targetValue: goalData?.stepsGoal || 0
    }
  ]

  const handleViewWorkout = (workoutId: string) => {
    console.log(workoutId)
  }

  useEffect(() => {
    if (onOverlayLoading) {
      onOverlayLoading(isFetching > 0 || isMutating > 0)
    }
  }, [isFetching, isMutating, onOverlayLoading])

  const handleViewWorkouts = () => router.push("/categories/Exercise")

  return (
    <View className="mt-6 h-full">
      <LoadingOverlay visible={isFetching > 0 || isMutating > 0} />

      <HStack center className="justify-between">
        <WorkoutSummary workoutData={workoutData} />
        <WorkoutProgress calorieData={caloriesData} workoutData={workoutData} />
      </HStack>

      <Progress
        height={8}
        progress={caloriesProgress}
        labelStart="Mục tiêu hằng ngày"
        labelEnd={`${toFixed(caloriesProgress, 0)}%`}
        className="mt-8"
      />

      <Section
        label="Hoạt động hôm nay"
        action="Thêm bài tập"
        onPress={handleViewWorkouts}
      />

      <VStack gap={12}>
        {workoutsData.items.map((item) => (
          <WorkoutCard
            key={item.workoutId}
            name={item.name}
            image={item.image}
            totalDuration={item.totalDuration}
            totalCaloriesBurned={item.totalCaloriesBurned}
            totalExercise={item.totalExercise}
            onPress={() => handleViewWorkout(item.workoutId)}
          />
        ))}
      </VStack>
    </View>
  )
}
