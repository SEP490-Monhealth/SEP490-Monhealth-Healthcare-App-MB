import React from "react"

import { Image, Text, View } from "react-native"

import { VStack } from "@/components/global/atoms"
import { CircularProgress } from "@/components/global/molecules"

import { toFixed } from "@/utils/formatters"
import { getWorkoutColor } from "@/utils/helpers"

export interface WorkoutProps {
  label: string
  value: number
  targetValue: number
}

interface WorkoutProgressProps {
  calorieData: WorkoutProps
  workoutsData: WorkoutProps[]
}

export const WorkoutProgress = ({
  calorieData,
  workoutsData
}: WorkoutProgressProps) => {
  const workoutValue = toFixed(calorieData.value, 0)
  const workoutGoal = toFixed(calorieData.targetValue, 0)

  return (
    <View
      className="relative items-center justify-center"
      style={{ width: 240, height: 240 }}
    >
      {workoutsData.map((workout, index) => {
        const progress =
          workout.targetValue > 0
            ? (workout.value / workout.targetValue) * 100
            : 0

        return (
          <View key={index} className="absolute items-center">
            <CircularProgress
              size={240 - index * 34}
              width={7}
              fill={progress}
              tintColor={getWorkoutColor(workout.label)}
            />
          </View>
        )
      })}

      <VStack center>
        <Image
          source={require("../../../../../public/images/monhealth-workout-image.png")}
          className="rotate-45"
          style={{ width: 24, height: 24 }}
        />

        <Text className="-mb-2 font-tbold text-base text-primary">
          {workoutValue} / {workoutGoal}
        </Text>

        <Text className="font-tmedium text-sm text-accent">
          {calorieData.label === "Calories" && "kcal"}
        </Text>
      </VStack>
    </View>
  )
}
