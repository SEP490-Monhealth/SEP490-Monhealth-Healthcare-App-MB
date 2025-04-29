import React, { useEffect } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { Badge, HStack, VStack } from "@/components/global/atoms"
import { ActivityCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { GoalTypeEnum, getGoalTypeMeta } from "@/constants/enum/Goal"

import { useUpdateActivityStatus } from "@/hooks/useActivity"
import { useGetWorkoutGoal } from "@/hooks/useGoal"
import { useGetDailyActivityByUserId } from "@/hooks/useTracker"

import { formatDateY, toFixed } from "@/utils/formatters"

import { WorkoutProgress } from "./WorkoutProgress"
import { WorkoutSummary } from "./WorkoutSummary"

interface ActivityTabProps {
  userId?: string
  onOverlayLoading: (isLoading: boolean) => void
}

export const ActivityTab = ({ userId, onOverlayLoading }: ActivityTabProps) => {
  const router = useRouter()

  const today = formatDateY(new Date())

  const { mutate: updateActivityStatus } = useUpdateActivityStatus()

  const { data: dailyActivityData } = useGetDailyActivityByUserId(userId, today)
  const { data: workoutGoalData } = useGetWorkoutGoal(userId)

  // console.log(JSON.stringify(dailyActivityData, null, 2))

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    onOverlayLoading(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

  const activitiesData = dailyActivityData?.items || []

  const { label: goalTypeLabel } = getGoalTypeMeta(
    dailyActivityData?.goalType ?? GoalTypeEnum.Maintenance
  )

  const defaultActivitiesData = [
    {
      activityId: "default-workout-1",
      workoutId: "default-workout-1",
      name: "Hoạt động 1",
      caloriesBurned: 0,
      durationMinutes: 0,
      isCompleted: false,
      isDefault: true
    },
    {
      activityId: "default-workout-2",
      workoutId: "default-workout-2",
      name: "Hoạt động 2",
      caloriesBurned: 0,
      durationMinutes: 0,
      isCompleted: false,
      isDefault: true
    },
    {
      activityId: "default-workout-3",
      workoutId: "default-workout-3",
      name: "Hoạt động 3",
      caloriesBurned: 0,
      durationMinutes: 0,
      isCompleted: false,
      isDefault: true
    }
  ]

  const mergedActivitiesData = dailyActivityData?.items?.length
    ? activitiesData
    : defaultActivitiesData

  const caloriesBurnedGoal = workoutGoalData?.caloriesBurnedGoal || 0

  const caloriesBurnedData = {
    label: "Calories",
    value: dailyActivityData?.totalCaloriesBurned || 0,
    targetValue: caloriesBurnedGoal
  }

  const workoutsData = [
    {
      label: "Đã nạp",
      value: toFixed(dailyActivityData?.totalCaloriesIntake ?? 0, 0) || 0,
      targetValue: toFixed(workoutGoalData?.caloriesGoal ?? 0, 0)
    },
    {
      label: "Thời gian",
      value: dailyActivityData?.totalDurationMinutes || 0,
      targetValue: workoutGoalData?.workoutDurationGoal || 0
    }
  ]

  const handleCompleteActivity = (activityId: string) => {
    console.log(activityId)
    updateActivityStatus(activityId)
  }

  const handleViewWorkouts = () => {
    router.push("/workouts")
  }

  const handleViewWorkout = (workoutId: string) => {
    router.push(`/workouts/${workoutId}`)
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

      {/* <Progress
        height={8}
        progress={dailyCaloriesBurnedGoal}
        labelStart="Mục tiêu hằng ngày"
        labelEnd={`${toFixed(dailyCaloriesBurnedGoal, 0)}%`}
        className="mt-8"
      /> */}

      {dailyActivityData && (
        <Section
          label="Mục tiêu hiện tại"
          description={
            goalTypeLabel === "Giảm cân"
              ? "Giảm calo để kiểm soát cân nặng"
              : goalTypeLabel === "Tăng cân"
                ? "Tăng cường dưỡng chất và calo"
                : "Duy trì năng lượng ổn định"
          }
          action={
            <Badge
              label={goalTypeLabel || ""}
              background={COLORS.primary}
              color="#fff"
            />
          }
        />
      )}

      <Section
        label="Hoạt động hôm nay"
        actionText="Thêm bộ bài tập"
        onPress={handleViewWorkouts}
      />

      <VStack gap={12}>
        {mergedActivitiesData.map((item) => (
          <ActivityCard
            key={item.activityId}
            name={item.name}
            durationMinutes={item.durationMinutes}
            caloriesBurned={item.caloriesBurned}
            isCompleted={item.isCompleted}
            isDefault={"isDefault" in item}
            onPress={() =>
              "isDefault" in item
                ? handleViewWorkouts()
                : handleViewWorkout(item.workoutId)
            }
            onCheckboxChange={() =>
              "isDefault" in item
                ? handleViewWorkouts()
                : handleCompleteActivity(item.activityId)
            }
          />
        ))}
      </VStack>
    </View>
  )
}
