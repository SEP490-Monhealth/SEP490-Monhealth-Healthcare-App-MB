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
  workoutData: WorkoutProps[]
}

export const WorkoutProgress = ({
  calorieData,
  workoutData
}: WorkoutProgressProps) => {
  return (
    <View
      className="relative items-center justify-center"
      style={{ width: 240, height: 240 }}
    >
      {workoutData.map((workout, index) => {
        const fill =
          workout.targetValue > 0
            ? (workout.value / workout.targetValue) * 100
            : 0

        return (
          <View key={index} className="absolute items-center">
            <CircularProgress
              size={240 - index * 30}
              width={6}
              fill={fill}
              tintColor={getWorkoutColor(workout.label)}
            />
          </View>
        )
      })}

      <VStack center>
        <Image
          source={require("../../../../../public/images/monhealth-workout-image.png")}
          resizeMode="cover"
          className="-rotate-45"
          style={{ width: 24, height: 24 }}
        />

        <Text className="-mb-2 font-tbold text-base text-primary">
          {calorieData
            ? `${toFixed(calorieData.value, 0)} / ${toFixed(calorieData.targetValue, 0)}`
            : "0 / 0"}
        </Text>

        <Text className="font-tmedium text-sm text-accent">
          {calorieData.label === "Calories" && "Kcal"}
        </Text>
      </VStack>
    </View>
  )
}
