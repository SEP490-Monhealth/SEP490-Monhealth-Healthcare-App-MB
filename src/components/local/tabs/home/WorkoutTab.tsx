import { View } from "react-native"

import { useRouter } from "expo-router"

import { LoadingOverlay } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { Content, HStack, Progress } from "@/components/global/atoms"
import { WorkoutCard } from "@/components/global/molecules/WorkoutCard"
import { Section } from "@/components/global/organisms"

import { sampleWorkoutDailyData } from "@/constants/dailyWorkoutExsample"
import { sampleWorkoutGoalData } from "@/constants/dailyWorkoutGoal"

import { toFixed } from "@/utils/formatters"

import { ExerciseSummary } from "./ExerciseSummary"
import { WorkoutProgress } from "./WorkoutProgress"

interface WorkoutTabProps {
  onLoading: (isLoading: boolean) => void
}

export const WorkoutTab = ({ onLoading }: WorkoutTabProps) => {
  const router = useRouter()

  const dataWorkout = sampleWorkoutDailyData[0]
  const dataGoal = sampleWorkoutGoalData
  const caloriesGoal = dataGoal?.exerciseCaloriesGoal || 0
  const caloriesValue = dataWorkout?.progress?.calories || 0

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const handleViewWorkouts = () => router.push("/workouts")

  const handleViewWorkout = (workoutId: string) => {
    console.log(workoutId)
  }

  const caloriesProgress =
    caloriesGoal > 0 ? (caloriesValue / caloriesGoal) * 100 : 0

  const caloriesData = {
    label: "Calories",
    value: dataWorkout?.progress?.calories || 0,
    targetValue: caloriesGoal
  }

  const progressData = [
    {
      label: "Thời gian",
      value: dataWorkout?.progress?.duration || 0,
      targetValue: dataGoal?.exerciseDurationGoal || 0
    },
    {
      label: "Bước chân",
      value: dataWorkout?.progress?.steps || 0,
      targetValue: dataGoal?.stepsGoal || 0
    },
    {
      label: "Calo",
      value: dataWorkout?.progress?.calories || 0,
      targetValue: dataGoal?.exerciseCaloriesGoal || 0
    }
  ]

  return (
    <View className="mt-6 h-full">
      <LoadingOverlay visible={isFetching > 0 || isMutating > 0} />

      <HStack center className="justify-between">
        <ExerciseSummary progressData={progressData} />
        <WorkoutProgress
          calorieData={caloriesData}
          progressData={progressData}
        />
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

      <Content>
        {dataWorkout.items.map((item) => (
          <View key={item.workoutId} className="mb-3">
            <WorkoutCard
              name={item.name}
              image={item.image}
              totalDuration={item.totalDuration}
              totalCaloriesBurned={item.totalCaloriesBurned}
              totalExercise={item.totalExercise}
              onPress={() => handleViewWorkout(item.workoutId)}
            />
          </View>
        ))}
      </Content>
    </View>
  )
}
