import { useEffect } from "react"

import { View } from "react-native"

import { router, useRouter } from "expo-router"

import { LoadingOverlay } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { HStack, Progress, VStack } from "@/components/global/atoms"
import { WorkoutCard } from "@/components/global/molecules/WorkoutCard"
import { Section } from "@/components/global/organisms"

import { sampleWorkoutDailyData } from "@/constants/dailyWorkouts"

import { useRouterHandlers } from "@/hooks/useRouter"

import { formatDateYYYYMMDD, toFixed } from "@/utils/formatters"

import { WorkoutProgress } from "./WorkoutProgress"
import { WorkoutSummary } from "./WorkoutSummary"
import { useAuth } from "@/contexts/AuthContext"

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

  const today = formatDateYYYYMMDD(new Date())

  const workoutsData = sampleWorkoutDailyData[0]

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const workoutGoalData = {
    workoutDurationGoal: 100,
    caloriesBurnedGoal: 500,
    stepsGoal: 1300
  }

  const caloriesBurnedGoal = workoutGoalData?.caloriesBurnedGoal || 0
  const caloriesValue = workoutsData?.progress?.calories || 0

  const caloriesData = {
    label: "Calories",
    value: workoutsData?.progress?.calories || 0,
    targetValue: caloriesBurnedGoal
  }

  const workoutsData = [
    {
      label: "Thời gian",
      value: workoutsData?.progress?.duration || 0,
      targetValue: workoutGoalData?.workoutDurationGoal || 0
    },
    {
      label: "Calo",
      value: workoutsData?.progress?.calories || 0,
      targetValue: workoutGoalData?.caloriesBurnedGoal || 0
    },
    {
      label: "Bước chân",
      value: workoutsData?.progress?.steps || 0,
      targetValue: workoutGoalData?.stepsGoal || 0
    }
  ]

  const dailyCaloriesBurnedGoal =
    caloriesBurnedGoal > 0 ? (caloriesValue / caloriesBurnedGoal) * 100 : 0

  useEffect(() => {
    if (onOverlayLoading) {
      onOverlayLoading(isFetching > 0 || isMutating > 0)
    }
  }, [isFetching, isMutating, onOverlayLoading])

  const handleViewWorkouts = () => router.push("/categories/Exercise")

  const handleViewWorkout = (workoutId: string) => {
    console.log(workoutId)
  }

  return (
    <View className="mt-6 h-full">
      <LoadingOverlay visible={isFetching > 0 || isMutating > 0} />

      <HStack center className="justify-between">
        <WorkoutSummary workoutsData={workoutsData} />
        <WorkoutProgress calorieData={caloriesData} workoutsData={workoutsData} />
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
