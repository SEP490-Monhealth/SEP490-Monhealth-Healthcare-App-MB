import { useEffect } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { Badge, HStack, VStack } from "@/components/global/atoms"
import { ActivityCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { GoalTypeEnum, getGoalTypeMeta } from "@/constants/enum/Goal"

import { useAuth } from "@/contexts/AuthContext"

import { useGetDailyActivityByUserId } from "@/hooks/useDailyActivity"
import { useGetWorkoutGoal } from "@/hooks/useGoal"

import { formatDateY, toFixed } from "@/utils/formatters"

import { WorkoutProgress } from "./WorkoutProgress"
import { WorkoutSummary } from "./WorkoutSummary"

interface ActivityTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const ActivityTab = ({
  onLoading,
  onOverlayLoading
}: ActivityTabProps) => {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const today = formatDateY(new Date())

  const { data: dailyActivityData } = useGetDailyActivityByUserId(userId, today)
  const { data: workoutGoalData } = useGetWorkoutGoal(userId)

  // console.log(dailyActivityData)

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    if (onLoading) {
      onLoading(!dailyActivityData || !workoutGoalData)
    }
  }, [dailyActivityData, workoutGoalData, onLoading])

  useEffect(() => {
    if (onOverlayLoading) {
      onOverlayLoading(isFetching > 0 || isMutating > 0)
    }
  }, [isFetching, isMutating, onOverlayLoading])

  const activitiesData = dailyActivityData?.items || []

  const { label: goalTypeLabel } = getGoalTypeMeta(
    dailyActivityData?.goalType ?? GoalTypeEnum.Maintenance
  )

  // const { label: goalTypeLabel } = getGoalTypeMeta(2)

  const defaultActivitiesData = [
    {
      activityId: "default-workout-1",
      name: "Hoạt động 1",
      caloriesBurned: 0,
      durationMinutes: 0,
      isDefault: true
    },
    {
      activityId: "default-workout-2",
      name: "Hoạt động 2",
      caloriesBurned: 0,
      durationMinutes: 0,
      isDefault: true
    },
    {
      activityId: "default-workout-3",
      name: "Hoạt động 3",
      caloriesBurned: 0,
      durationMinutes: 0,
      isDefault: true
    }
  ]

  const mergedActivitiesData = dailyActivityData?.items?.length
    ? activitiesData
    : defaultActivitiesData

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
      value: toFixed(dailyActivityData?.totalCaloriesIntake ?? 0, 0) || 0,
      targetValue: toFixed(workoutGoalData?.caloriesGoal ?? 0, 0)
    },
    {
      label: "Thời gian",
      value: dailyActivityData?.totalDurationMinutes || 0,
      targetValue: workoutGoalData?.workoutDurationGoal || 0
    }
  ]

  // const dailyCaloriesBurnedGoal =
  //   caloriesBurnedGoal > 0
  //     ? (caloriesBurnedValue / caloriesBurnedGoal) * 100
  //     : 0

  const handleViewWorkouts = () => {
    router.push("/workouts")
  }

  const handleViewWorkout = (activityId: string) => {
    router.push(`/workouts/${activityId}`)
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
            <HStack className="items-center justify-between">
              <Badge
                label={goalTypeLabel || ""}
                background={COLORS.primary}
                color="#fff"
              />
            </HStack>
          }
          className="mt-8"
        />
      )}

      <Section
        label="Hoạt động hôm nay"
        actionText="Thêm bộ bài tập"
        onPress={handleViewWorkouts}
      />

      <VStack gap={12}>
        {mergedActivitiesData.map((item, index) => (
          <ActivityCard
            key={item.activityId}
            name={`Hoạt động ${index + 1}`}
            durationMinutes={item.durationMinutes}
            caloriesBurned={item.caloriesBurned}
            onPress={() =>
              "isDefault" in item &&
              !item.isDefault &&
              handleViewWorkout(item.activityId)
            }
          />
        ))}
      </VStack>
    </View>
  )
}
